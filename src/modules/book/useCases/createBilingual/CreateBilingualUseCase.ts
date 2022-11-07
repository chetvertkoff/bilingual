import { IBookReaderService } from '../../services/BookReaderService'
import { IHtmlParseService } from '../../services/HtmlParseService'
import { ITranslateService } from '../../services/TranslateService'
import { UseCase } from '../../../../core/domain/UseCase'
import { CreateBilingualError } from './CreateBilingualError'
import { Result } from '../../../../core/helpers/Result'
import { BookNotifyFactory } from '../../services/BookNotifyService'
import { IBookRepo } from '../../repos/BookRepo'

type Props = {
	bookPath: string
	userId: string
}

export class CreateBilingualUseCase implements UseCase<Props, Promise<void>> {
	constructor(
		private bookReader: IBookReaderService,
		private htmlParser: IHtmlParseService,
		private translater: ITranslateService,
		private notifyFactory: BookNotifyFactory,
		private bookRepo: IBookRepo
	) {}

	public async execute({ bookPath, userId }: Props) {
		const notify = this.notifyFactory(userId)
		try {
			const bookChaptersBody = await this.bookReader.execute(bookPath)
			if (!bookChaptersBody.success) {
				return notify.sendMessage(new CreateBilingualError.BookParseError())
			}

			const parsedBook = await this.htmlParser.execute(bookChaptersBody.value)
			if (!parsedBook.success) {
				return notify.sendMessage(new CreateBilingualError.BookParseError())
			}

			const translatedBook = await this.translater.execute(parsedBook.value)
			if (!translatedBook.success) {
				return notify.sendMessage(new CreateBilingualError.BookTranslateError())
			}

			const book = {
				chapters: translatedBook.value,
			}

			const saveProgress = await this.bookRepo.save(book, Number(userId))
			if (!saveProgress.success) {
				return notify.sendMessage(new CreateBilingualError.BookSaveError())
			}

			return notify.sendMessage(Result.ok())
		} catch (e) {
			console.log(e)
			notify.sendMessage(Result.fail(new Error()))
		}
	}
}
