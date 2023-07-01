import { Notifier } from '../../../../../../infra/ws/Notifier'
import { IFactory } from '../../../../../../shared/types/IFactory'
import { ParseBookService } from '../ParseBookService'
import { IBookReaderService } from '../../../../services/BookReaderService'
import { IUserRepo } from '../../../../repos/UserRepo'
import { IBookRepo } from '../../../../repos/BookRepo'
import { IHtmlParseService } from '../../../../services/HtmlParseService'

export class ParseBookServiceFactory implements IFactory<ParseBookService> {
	constructor(
		private bookReader: IBookReaderService,
		private userRepo: IUserRepo,
		private notify: Notifier,
		private bookRepo: IBookRepo,
		private htmlParser: IHtmlParseService
	) {}

	public create(userId: string, bookPath: string) {
		return new ParseBookService(
			userId,
			bookPath,
			this.bookReader,
			this.userRepo,
			this.notify,
			this.bookRepo,
			this.htmlParser
		)
	}
}
