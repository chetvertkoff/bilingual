import { Book } from '../../../infra/db/entity/Book'

export class BookMapWithRelations {
	public static fromDb(book: Book) {
		return {
			id: book.id,
			createdDate: book.createdDate,
			// chapters: book.chapters.map(ch => )
		}
	}
}
