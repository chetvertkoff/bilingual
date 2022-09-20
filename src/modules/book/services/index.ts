import { BookReaderService } from './BookReaderService'
import { HtmlParseService } from './HtmlParseService'
import { TranslateService } from './TranslateService'
import { BookReaderEpubService } from './BookReaderEpubService'
import { notifyServiceFactory as createFactory } from './NotifyService'
import { notify } from '../../../infra/ws'

const notifyServiceFactory = createFactory(notify)
const bookReaderEpubService = new BookReaderEpubService()
const bookReaderService = new BookReaderService(bookReaderEpubService)
const htmlParseService = new HtmlParseService()
const translateService = new TranslateService()

export { bookReaderService, htmlParseService, translateService, notifyServiceFactory }
