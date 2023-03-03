import { GetBookController } from './GetBookController'
import { GetBookUseCase } from './GetBookUseCase'
import { bookRepo } from '../../repos'

const getBookUseCase = new GetBookUseCase(bookRepo)
const getBookController = new GetBookController(getBookUseCase)

export { getBookController }
