export class ChapterMap {
	public static toDb(chapter) {
		return {
			name: chapter.name,
			book: chapter.book,
			chapterFull: chapter.chapterFull,
		}
	}
}
