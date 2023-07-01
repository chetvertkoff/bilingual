import { CreateBilingualController } from './CreateBilingual.controller'
import { CreateBilingualUseCase } from './CreateBilingualUseCase'
import * as DTO from './CreateBilingualDTO'
import { notify } from '../../../../infra/ws'
import { mediator } from '../../../../shared/infra'
import { createBilingualFactories } from './services/factories'

const createBilingualUseCase = new CreateBilingualUseCase(
	notify,
	mediator,
	createBilingualFactories.createBookServiceFactory,
	createBilingualFactories.parseBookServiceFactory,
	createBilingualFactories.translateBookServiceFactory,
	createBilingualFactories.saveBookServiceFactory
)
const createBilingualController = new CreateBilingualController(createBilingualUseCase)

export { createBilingualController, DTO }
