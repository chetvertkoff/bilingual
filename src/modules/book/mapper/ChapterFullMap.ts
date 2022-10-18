export class ChapterFullMap {
	public static toDb(chapterFull) {
		return {
			id: chapterFull.id,
			originalText: chapterFull.originalText,
			translate: chapterFull.translate,
			tagName: chapterFull.tagName,
			translateDict: chapterFull.translateDict,
			chapter: chapterFull.chapter,
		}
	}
}
