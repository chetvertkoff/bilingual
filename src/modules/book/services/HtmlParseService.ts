import { JSDOM } from 'jsdom'
import { Result } from '../../../core/helpers/Result'
import { BookReaderResult, BookReaderResultDTO } from './BookReaderService'

export interface ParsedChapterDTO {
	originalText: string
	tagName: Element['localName']
}

export interface HtmlParserResultDTO {
	name: string
	chapter: ParsedChapterDTO[]
}

export interface IHtmlParseService {
	execute(book: BookReaderResult): Promise<Result<HtmlParserResultDTO[]>>
}

export class HtmlParseService implements IHtmlParseService {
	public async execute(book: BookReaderResult): Promise<Result<HtmlParserResultDTO[]>> {
		try {
			const { chapters } = book
			const res = await Promise.all(chapters.map(async (ch) => this.parseBook(await ch)))
			return Result.ok<HtmlParserResultDTO[]>(res.filter((chapter) => chapter))
		} catch (e) {
			return Result.fail<HtmlParserResultDTO[]>(e)
		}
	}

	private isHeadingInDocument = (document: Document): boolean =>
		Array.from({ length: 6 }, (_, i) => i).some((num) => document.querySelector(`h${num + 1}`))

	private parseBook({ id, html }: BookReaderResultDTO): HtmlParserResultDTO | null {
		const document = new JSDOM(html).window.document
		if (!document.querySelector('p') && !this.isHeadingInDocument(document)) return null

		return {
			name: id,
			chapter: this.parseChapter(document.body),
		}
	}

	private parseChapter(body: Element): ParsedChapterDTO[] {
		const res = []

		const parseRecursive = (node: Element) => {
			const arr = Array.from(node?.children ?? [])
			if (arr.length) {
				arr.forEach((item) => {
					const originalText = this.formatText(item.textContent)
					if (originalText && (item.localName === 'p' || /h[0-9]/.test(item.localName))) {
						res.push({
							originalText,
							tagName: item.localName,
						})
					} else {
						parseRecursive(item)
					}
				})
			}
		}
		parseRecursive(body)
		return res
	}

	private formatText = (text: string) => {
		return text.replace(/(\n)/g, '').replace(/(\s{2,})/g, ' ')
	}
}
