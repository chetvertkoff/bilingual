export interface BookChapterElementDTO {
	originalText: string
	translate: string
	tagName: Element['localName']
	translateDict: Record<string, string>
}

export interface BookChapterDTO {
	name: string
	paragraph: BookChapterElementDTO[]
}

export interface BilingualDTO {
	chapters: BookChapterDTO[]
}
