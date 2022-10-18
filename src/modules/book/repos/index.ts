import { BookRepo } from './BookRepo'
import { db } from '../../../infra/db'

const bookRepo = new BookRepo(db)

export { bookRepo }
