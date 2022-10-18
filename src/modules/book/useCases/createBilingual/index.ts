// @ts-nocheck
import { CreateBilingualController } from './CreateBilingualController'
import { CreateBilingualUseCase } from './CreateBilingualUseCase'
import { bookReaderService, htmlParseService, notifyServiceFactory, translateService } from '../../services'
import * as DTO from './CreateBilingualDTO'
import { bookRepo } from '../../repos'

const createBilingualUseCase = new CreateBilingualUseCase(
	bookReaderService,
	htmlParseService,
	translateService,
	notifyServiceFactory,
	bookRepo
)
const createBilingualController = new CreateBilingualController(createBilingualUseCase)

export { createBilingualController, DTO }
