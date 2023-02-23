import { GetParagraphController } from './GetParagraphController'
import { GetParagraphUseCase } from './GetParagraphUseCase'
import { paragraphRepo } from '../../repos'

const getParagraphUseCase = new GetParagraphUseCase(paragraphRepo)
const getParagraphController = new GetParagraphController(getParagraphUseCase)

export { getParagraphController, getParagraphUseCase }
