import { BookReaderService } from './BookReaderService'
import { HtmlParseService } from './HtmlParseService'
import { TranslateService } from './TranslateService'
import { BookReaderEpubService } from './BookReaderEpubService'
import { observer } from '../../../shared/infra'

const bookReaderEpubService = new BookReaderEpubService()
const bookReaderService = new BookReaderService(bookReaderEpubService)
const htmlParseService = new HtmlParseService()
const translateService = new TranslateService(observer)

export { bookReaderService, htmlParseService, translateService }
