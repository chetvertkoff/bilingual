import { BookRepo } from './BookRepo'
import { db } from '../../../infra/db'
import { ParagraphRepo } from './ParagraphRepo'
import { ChapterRepo } from './ChapterRepo'

const bookRepo = new BookRepo(db)
const paragraphRepo = new ParagraphRepo(db)

const chapterRepo = new ChapterRepo(db)

export { bookRepo, paragraphRepo, chapterRepo }
