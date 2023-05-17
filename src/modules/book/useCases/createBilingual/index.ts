import { CreateBilingualController } from './CreateBilingual.controller'
import { CreateBilingualUseCase } from './CreateBilingualUseCase'
import { bookReaderService, htmlParseService, translateService } from '../../services'
import * as DTO from './CreateBilingualDTO'
import { notify } from '../../../../infra/ws'
import { saveChaptersService } from './services'
import { observer } from '../../../../shared/infra'
import { bookRepo, userRepo } from '../../repos'

const createBilingualUseCase = new CreateBilingualUseCase(
	bookReaderService,
	htmlParseService,
	translateService,
	notify,
	saveChaptersService,
	observer,
	bookRepo,
	userRepo
)
const createBilingualController = new CreateBilingualController(createBilingualUseCase)

export { createBilingualController, DTO }
