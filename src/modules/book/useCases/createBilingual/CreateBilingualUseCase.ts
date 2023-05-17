import { IBookReaderService } from '../../services/BookReaderService'
import { HtmlParserResultDTO, IHtmlParseService } from '../../services/HtmlParseService'
import { ITranslateService } from '../../services/TranslateService'
import { UseCase } from '../../../../shared/domain/UseCase'
import { CreateBilingualError } from './CreateBilingualError'
import { Result } from '../../../../shared/helpers/Result'
import { Notifier } from '../../../../infra/ws/Notifier'
import { IObserver, WsResponse } from '../../../../shared/infra'
import { WsEvents } from '../../../../shared/constants'
import { ISaveChaptersService } from './services/SaveChaptersService'
import { CreateBilingualObserverEvents } from './constants'
import { BookDomain, ChapterDomain, UserDomain } from '../../domain'
import { IBookRepo } from '../../repos/BookRepo'
import { UserMap } from '../../mappers'
import { IUserRepo } from '../../repos/UserRepo'
import { v4 as uuidv4 } from 'uuid'

interface Props {
	bookPath: string
	userId: string
}

interface CreateBookProps extends Props {
	eventId: string
}

interface ParseBookProps extends CreateBookProps {
	book: BookDomain
}

interface TranslateBookProps extends ParseBookProps {
	parsedBook: Result<HtmlParserResultDTO[]>
	user: UserDomain
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
		const eventId = `${CreateBilingualObserverEvents.CHAPTER_TRANSLATE_PROGRESS}${uuidv4()}`
		try {
			const createBookProps = await this.createBook({ userId, bookPath, eventId })
			const parseBookProps = await this.parseBook(createBookProps)
			const translateBookProps = await this.translateBook(parseBookProps)
			await this.saveBook(translateBookProps)
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

		return { ...props, book: bookRes.value }
	}

	private async parseBook(props: ParseBookProps) {
		const { bookPath, userId, book: bookDomain } = props
		const book = await this.bookReader.execute(bookPath)
		const user = await this.userRepo.getUserByIdQuery(+userId)

		if (!book.success || !user.success) {
			this.notify.send(userId, new CreateBilingualError.BookParseError())
			return
		}
		if (book.value.cover)
			await this.bookRepo.saveCommand(
				BookDomain.create({ ...bookDomain, cover: book.value.cover.toString('base64') }),
				UserMap.toDb(user.value)
			)

		this.notify.send(userId, Result.ok(new WsResponse(WsEvents.BOOKS_REQUEST, { bookId: bookDomain.id })))

		const parsedBook = await this.htmlParser.execute(book.value)
		if (!parsedBook.success) {
			this.notify.send(userId, new CreateBilingualError.BookParseError())
			return
		}

		return { ...props, parsedBook, user: user.value }
	}

	private async translateBook(props: TranslateBookProps) {
		const { eventId, parsedBook, userId, user, book } = props
		const bookRes = await this.bookRepo.getBookByIdQuery(book.id, +userId)

		if (!bookRes.success) {
			this.notify.send(userId, new CreateBilingualError.BookTranslateError())
			return
		}

		this.observer.subscribe(eventId, ({ chapterIndex, chapterCount }) => {
			const a = chapterIndex + 1
			const b = chapterCount
			const percent = Math.trunc((a / b) * 90)
			this.notify.send(
				userId,
				Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: percent, bookId: book.id }))
			)

			this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: percent }), UserMap.toDb(user))
		})
		// @ts-ignore
		console.log(this.observer.subscribers)
		const translatedChapters = await this.translater.execute(eventId, parsedBook.value)

		if (!translatedChapters.success) {
			this.notify.send(userId, new CreateBilingualError.BookTranslateError())
			return
		}

		await this.notify.send(
			userId,
			Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: 95, bookId: book.id }))
		)
		await this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: 95 }), UserMap.toDb(user))

		return { ...props, translatedChapters }
	}

	private async saveBook(props: SaveBookProps) {
		const { userId, book, translatedChapters } = props
		const saveProgress = await this.saveChaptersService.saveChaptersWithParagraphs(
			+userId,
			book.id,
			translatedChapters.value
		)
		if (!saveProgress.success) {
			this.notify.send(userId, new CreateBilingualError.BookSaveError())
			return
		}

		this.notify.send(userId, Result.ok(new WsResponse(WsEvents.BOOK_TRANSLATED)))
	}
}
