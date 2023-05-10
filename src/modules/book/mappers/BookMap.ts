import { BookDomain } from '../domain'
import { Book } from '../../../infra'

export class BookMap {
	public static toDb(bookDomain: BookDomain): Book {
		const book = new Book()

		book.id = bookDomain.id
		book.progress = bookDomain.progress
		book.createdDate = bookDomain.createdDate
		book.cover = bookDomain.cover
		return book
	}

	public static toDomain(raw: Book): BookDomain {
		return BookDomain.create(raw)
	}
}
