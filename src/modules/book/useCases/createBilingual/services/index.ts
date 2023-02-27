import { SaveChaptersService } from './SaveChaptersService'
import { bookRepo, chapterRepo, paragraphRepo, userRepo } from '../../../repos'

const saveChaptersService = new SaveChaptersService(userRepo, bookRepo, chapterRepo, paragraphRepo)
export { saveChaptersService }
