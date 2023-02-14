import { Chapter } from '../../../infra/db/entity/Chapter'

export class ChapterMap {
	public static toDb(chapter) {
		return {
			name: chapter.name,
			book: chapter.book,
			paragraph: chapter.paragraph,
		}
	}

	public static fromDb(chapter: Chapter) {
		return {
			id: chapter.id,
		}
	}
}
