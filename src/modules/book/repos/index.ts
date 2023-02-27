import { BookRepo } from './BookRepo'
import { db } from '../../../infra/db'
import { ParagraphRepo } from './ParagraphRepo'
import { ChapterRepo } from './ChapterRepo'
import { UserRepo } from './UserRepo'

const userRepo = new UserRepo(db)
const bookRepo = new BookRepo(db)
const paragraphRepo = new ParagraphRepo(db)

const chapterRepo = new ChapterRepo(db)

export { bookRepo, paragraphRepo, chapterRepo, userRepo }
