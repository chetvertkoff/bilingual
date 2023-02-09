import { GetTranslateController } from './GetTranslateController'
import { translateService } from '../../services'

const getTranslateController = new GetTranslateController(translateService)

export { getTranslateController }
