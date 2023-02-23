import { GetChapterController } from './GetChapterController'
import { GetChapterUseCase } from './GetChapterUseCase'
import { chapterRepo } from '../../repos'

const getChapterUseCase = new GetChapterUseCase(chapterRepo)
const getChapterController = new GetChapterController(getChapterUseCase)

export { getChapterController }
