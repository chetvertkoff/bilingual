// @ts-nocheck
import { GetBilingualController } from './GetBilingualController'
import { GetBilingualUseCase } from './GetBilingualUseCase'
import { bookReaderService, htmlParseService, notifyService, translateService } from '../../services'
import * as DTO from './GetBilingualDTO'

const getBilingualUseCase = new GetBilingualUseCase(
	bookReaderService,
	htmlParseService,
	translateService,
	notifyService
)
const getBilingualController = new GetBilingualController(getBilingualUseCase)

export { getBilingualController, DTO }
