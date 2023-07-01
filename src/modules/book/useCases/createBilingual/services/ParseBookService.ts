import { CreateBilingualError } from '../CreateBilingualError'
import { BookDomain } from '../../../domain'
import { UserMap } from '../../../mappers'
import { Result } from '../../../../../shared'
import { WsResponse } from '../../../../../shared/infra'
import { WsEvents } from '../../../../../shared/constants'
import { IBookReaderService } from '../../../services/BookReaderService'
import { IBookRepo } from '../../../repos/BookRepo'
import { IUserRepo } from '../../../repos/UserRepo'
import { Notifier } from '../../../../../infra/ws/Notifier'
import { HtmlParserResultDTO, IHtmlParseService } from '../../../services/HtmlParseService'

export class ParseBookService {
	constructor(
		private userId: string,
		private bookPath: string,
		private bookReader: IBookReaderService,
		private userRepo: IUserRepo,
		private notify: Notifier,
		private bookRepo: IBookRepo,
		private htmlParser: IHtmlParseService
	) {}

	public async execute(bookDomain: BookDomain) {
		const book = await this.bookReader.execute(this.bookPath)
		const user = await this.userRepo.getUserByIdQuery(+this.userId)

		if (!book.success || !user.success) {
			this.notify.send(this.userId, new CreateBilingualError.BookParseError())
			return Result.fail<HtmlParserResultDTO[]>()
		}
		if (book.value.cover)
			await this.bookRepo.saveCommand(
				BookDomain.create({ ...bookDomain, cover: book.value.cover.toString('base64') }),
				UserMap.toDb(user.value)
			)

		this.notify.send(this.userId, Result.ok(new WsResponse(WsEvents.BOOKS_REQUEST, { bookId: bookDomain.id })))

		const parsedBook = await this.htmlParser.execute(book.value)
		if (!parsedBook.success) {
			this.notify.send(this.userId, new CreateBilingualError.BookParseError())
			return Result.fail<HtmlParserResultDTO[]>()
		}

		return parsedBook
	}
}
