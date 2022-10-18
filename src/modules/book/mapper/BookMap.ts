export class BookMap {
	public static toDb(book) {
		return {
			id: book.id,
			user: book.user,
			chapters: book.chapters,
		}
	}
}
