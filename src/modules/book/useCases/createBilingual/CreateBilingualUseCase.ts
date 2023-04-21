import { IBookReaderService } from '../../services/BookReaderService'
import { HtmlParserResultDTO, IHtmlParseService } from '../../services/HtmlParseService'
import { ITranslateService } from '../../services/TranslateService'
import { UseCase } from '../../../../core/domain/UseCase'
import { CreateBilingualError } from './CreateBilingualError'
import { Result } from '../../../../core/helpers/Result'
import { Notifier } from '../../../../infra/ws/Notifier'
import { IObserver, WsResponse } from '../../../../core/infra'
import { WsEvents } from '../../../../core/constants'
import { ISaveChaptersService } from './services/SaveChaptersService'
import { CreateBilingualObserverEvents } from './constants'
import { BookDomain, ChapterDomain } from '../../domain'
import { IBookRepo } from '../../repos/BookRepo'
import { UserMap } from '../../mappers'
import { IUserRepo } from '../../repos/UserRepo'

interface Props {
	bookPath: string
	userId: string
}

interface CreateBookProps extends Props {
	eventId: string
}

interface ParseBookProps extends CreateBookProps {
	bookId: number
}

interface TranslateBookProps extends ParseBookProps {
	parsedBook: Result<HtmlParserResultDTO[]>
}
interface SaveBookProps extends ParseBookProps {
	translatedChapters: Result<ChapterDomain[]>
}

export class CreateBilingualUseCase implements UseCase<Props, Promise<void>> {
	constructor(
		private bookReader: IBookReaderService,
		private htmlParser: IHtmlParseService,
		private translater: ITranslateService,
		private notify: Notifier,
		private saveChaptersService: ISaveChaptersService,
		private observer: IObserver,
		private bookRepo: IBookRepo,
		private userRepo: IUserRepo
	) {}

	public async execute({ userId, bookPath }: Props) {
		const eventId = `${CreateBilingualObserverEvents.CHAPTER_TRANSLATE_PROGRESS}${userId}`
		try {
			await this.createBook({ userId, bookPath, eventId })
		} catch (e) {
			this.notify.send(userId, Result.fail(new Error()))
		} finally {
			this.observer.unsubscribe(eventId)
		}
	}

	private async createBook(props: CreateBookProps) {
		const { userId } = props
		const bookRes = await this.saveChaptersService.getNewBook(+userId)
		if (!bookRes.success) {
			this.notify.send(userId, new CreateBilingualError.BookSaveError())
			return
		}

		this.notify.send(userId, Result.ok(new WsResponse(WsEvents.BOOKS_REQUEST)))

		const bookId = bookRes.value.id

		await this.parseBook({ ...props, bookId })
	}

	private async parseBook(props: ParseBookProps) {
		const { bookPath, userId } = props
		const bookChaptersBody = await this.bookReader.execute(bookPath)
		if (!bookChaptersBody.success) {
			this.notify.send(userId, new CreateBilingualError.BookParseError())
			return
		}

		const parsedBook = await this.htmlParser.execute(bookChaptersBody.value)
		if (!parsedBook.success) {
			this.notify.send(userId, new CreateBilingualError.BookParseError())
			return
		}

		await this.translateBook({ ...props, parsedBook })
	}

	private async translateBook(props: TranslateBookProps) {
		const { eventId, parsedBook, userId, bookId } = props
		const bookRes = await this.bookRepo.getBookByIdQuery(bookId, +userId)
		const user = await this.userRepo.getUserByIdQuery(+userId)

		if (!bookRes.success || !user.success) {
			this.notify.send(userId, new CreateBilingualError.BookTranslateError())
			return
		}

		this.observer.subscribe(eventId, ({ chapterIndex, chapterCount }) => {
			const a = chapterIndex + 1
			const b = chapterCount
			const percent = Math.trunc((a / b) * 90)
			this.notify.send(
				userId,
				Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: percent, bookId }))
			)

			this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: percent }), UserMap.toDb(user.value))
		})

		const translatedChapters = await this.translater.execute(eventId, parsedBook.value)

		if (!translatedChapters.success) {
			this.notify.send(userId, new CreateBilingualError.BookTranslateError())
			return
		}

		await this.notify.send(
			userId,
			Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: 95, bookId }))
		)
		await this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: 95 }), UserMap.toDb(user.value))
		await this.saveBook({ ...props, translatedChapters })
	}

	private async saveBook(props: SaveBookProps) {
		const { userId, bookId, translatedChapters } = props
		const saveProgress = await this.saveChaptersService.saveChaptersWithParagraphs(
			+userId,
			bookId,
			translatedChapters.value
		)
		if (!saveProgress.success) {
			this.notify.send(userId, new CreateBilingualError.BookSaveError())
			return
		}

		this.notify.send(userId, Result.ok(new WsResponse(WsEvents.BOOKS_REQUEST)))
	}
}
