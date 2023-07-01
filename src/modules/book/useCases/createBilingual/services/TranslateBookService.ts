import { CreateBilingualError } from '../CreateBilingualError'
import { Result } from '../../../../../shared'
import { IMediator, WsResponse } from '../../../../../shared/infra'
import { WsEvents } from '../../../../../shared/constants'
import { BookDomain, ChapterDomain } from '../../../domain'
import { UserMap } from '../../../mappers'
import { IBookRepo } from '../../../repos/BookRepo'
import { Notifier } from '../../../../../infra/ws/Notifier'
import { ITranslateService } from '../../../services/TranslateService'
import { HtmlParserResultDTO } from '../../../services/HtmlParseService'
import { IUserRepo } from '../../../repos/UserRepo'

export class TranslateBookService {
	constructor(
		private userId: string,
		private eventId: string,
		private bookRepo: IBookRepo,
		private notify: Notifier,
		private mediator: IMediator,
		private translater: ITranslateService,
		private userRepo: IUserRepo
	) {}

	public async execute(parsedBook: HtmlParserResultDTO[], bookId: number) {
		const user = await this.userRepo.getUserByIdQuery(+this.userId) // TODO оптимизировать количесво запросов
		const bookRes = await this.bookRepo.getBookByIdQuery(bookId, +this.userId)

		if (!bookRes.success || !user.success) {
			this.notify.send(this.userId, new CreateBilingualError.BookTranslateError())
			return Result.fail<ChapterDomain[]>()
		}

		this.mediator.subscribe(this.eventId, ({ chapterIndex, chapterCount }) => {
			const a = chapterIndex + 1
			const b = chapterCount
			const percent = Math.trunc((a / b) * 90)
			this.notify.send(
				this.userId,
				Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: percent, bookId }))
			)

			this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: percent }), UserMap.toDb(user.value))
		})

		const translatedChapters = await this.translater.execute(this.eventId, parsedBook)

		if (!translatedChapters.success) {
			this.notify.send(String(this.userId), new CreateBilingualError.BookTranslateError())
			return Result.fail<ChapterDomain[]>()
		}

		await this.notify.send(
			String(this.userId),
			Result.ok(new WsResponse(WsEvents.TRANSLATE_BOOK_PROGRESS, { progress: 95, bookId }))
		)
		await this.bookRepo.saveCommand(BookDomain.create({ ...bookRes.value, progress: 95 }), UserMap.toDb(user.value))

		return translatedChapters
	}
}
