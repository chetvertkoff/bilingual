// @ts-nocheck
import { IBookReaderService } from '../../services/BookReaderService'
import { IHtmlParseService } from '../../services/HtmlParseService'
import { ITranslateService } from '../../services/TranslateService'
import { UseCase } from '../../../../core/domain/UseCase'
import { BookChapterDTO } from './GetBilingualDTO'
import { GetBilingualError } from './GetBilingualError'
import { Result } from '../../../../core/helpers/Result'
import { UseCaseError } from '../../../../core/helpers/UseCaseError'
import { NotifyFactory } from '../../services/NotifyService'

type BookPath = string
type TranslatedBook = Result<BookChapterDTO[] | UseCaseError>

export class GetBilingualUseCase implements UseCase<BookPath, Promise<TranslatedBook>> {
	constructor(
		private bookReader: IBookReaderService,
		private htmlParser: IHtmlParseService,
		private translater: ITranslateService,
		private notifyFactory: NotifyFactory,
		private bookRepo: any
	) {}

	public async execute(bookPath: string, userId: string): Promise<TranslatedBook> {
		const notify = this.notifyFactory(userId)
		return notify.saveSuccess(userId, { message: 'привет' }).then()
		const bookChaptersBody = await this.bookReader.execute(bookPath)
		if (!bookChaptersBody.success) return new GetBilingualError.BookParseError()

		const parsedBook = await this.htmlParser.execute(bookChaptersBody.value)
		if (!parsedBook.success) return new GetBilingualError.BookParseError()

		const translatedBook = await this.translater.execute(parsedBook.value)
		if (!translatedBook.success) return new GetBilingualError.BookTranslateError()

		const saveProgress = await this.bookRepo.save(translatedBook.value)
		if (!saveProgress.success) return
	}
}
