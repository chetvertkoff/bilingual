import { BookDomain } from '../domain'
import { Book } from '../../../infra'

export class BookMap {
	public static toDb(bookDomain: BookDomain): Book {
		const book = new Book()

		book.id = bookDomain.id
		book.loading = bookDomain.loading
		book.createdDate = bookDomain.createdDate
		console.log('book', book)
		return book
	}

	public static toDomain(raw: Book): BookDomain {
		return BookDomain.create(raw)
	}
}
