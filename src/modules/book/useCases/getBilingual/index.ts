import { GetBilingualController } from './GetBilingualController'
import { GetBilingualUseCase } from './GetBilingualUseCase'
import { bookRepo } from '../../repos'

const getBilingualUseCase = new GetBilingualUseCase(bookRepo)
const getBilingualController = new GetBilingualController(getBilingualUseCase)

export { getBilingualController }
