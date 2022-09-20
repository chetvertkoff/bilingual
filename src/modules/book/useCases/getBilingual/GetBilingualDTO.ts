export interface BookChapterElementDTO {
	originalText: string
	translate: string
	tagName: Element['localName']
	translateDict: Record<string, string>
}

export interface BookChapterDTO {
	id: string
	chapter: BookChapterElementDTO[]
}

export interface BilingualDTO {
	bilingual: BookChapterDTO[]
}
