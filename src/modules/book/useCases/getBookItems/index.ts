import { GetBookItemsUseCase } from './GetBookItemsUseCase'
import { bookRepo } from '../../repos'
import { GetBookItemsController } from './GetBookItemsController'

const getBookItemsUseCase = new GetBookItemsUseCase(bookRepo)
const getBookItemsController = new GetBookItemsController(getBookItemsUseCase)

export { getBookItemsController }
