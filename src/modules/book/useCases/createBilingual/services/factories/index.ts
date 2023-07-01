import { CreateBookServiceFactory } from './CreateBookServiceFactory'
import { saveChaptersService } from '../index'
import { notify } from '../../../../../../infra'
import { ParseBookServiceFactory } from './ParseBookServiceFactory'
import { bookReaderService, htmlParseService, translateService } from '../../../../services'
import { bookRepo, userRepo } from '../../../../repos'
import { TranslateBookServiceFactory } from './TranslateBookServiceFactory'
import { mediator } from '../../../../../../shared/infra'
import { SaveBookServiceFactory } from './SaveBookServiceFactory'

const createBookServiceFactory = new CreateBookServiceFactory(saveChaptersService, notify)
const parseBookServiceFactory = new ParseBookServiceFactory(
	bookReaderService,
	userRepo,
	notify,
	bookRepo,
	htmlParseService
)
const translateBookServiceFactory = new TranslateBookServiceFactory(
	bookRepo,
	notify,
	mediator,
	translateService,
	userRepo
)
const saveBookServiceFactory = new SaveBookServiceFactory(saveChaptersService, notify)

export const createBilingualFactories = {
	createBookServiceFactory,
	parseBookServiceFactory,
	translateBookServiceFactory,
	saveBookServiceFactory,
}
