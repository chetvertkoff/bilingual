export class ParagraphMap {
	public static toDb(paragraph) {
		return {
			id: paragraph.id,
			originalText: paragraph.originalText,
			translate: paragraph.translate,
			tagName: paragraph.tagName,
			translateDict: paragraph.translateDict,
			chapter: paragraph.chapter,
		}
	}
}
