import { GetBilingualItemsUseCase } from './GetBilingualItemsUseCase'
import { bookRepo } from '../../repos'
import { GetBilingualItemsController } from './GetBilingualItemsController'

const getBilingualItemsUseCase = new GetBilingualItemsUseCase(bookRepo)
const getBilingualItemsController = new GetBilingualItemsController(getBilingualItemsUseCase)

export { getBilingualItemsController }
