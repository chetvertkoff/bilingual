export interface BookChapterElementDTO {
	originalText: string
	translate: string
	tagName: Element['localName']
	translateDict: Record<string, string>
}

export interface BookChapterDTO {
	name: string
	chapterFull: BookChapterElementDTO[]
}

export interface BilingualDTO {
	chapters: BookChapterDTO[]
}
