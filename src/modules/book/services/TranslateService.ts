import { HtmlParserResultDTO, ParsedChapterDTO } from './HtmlParseService'
import { Result } from '../../../core/helpers/Result'
import { BookChapterDTO, BookChapterElementDTO } from '../useCases/createBilingual/CreateBilingualDTO'
import axios from 'axios'
import { JSDOM } from 'jsdom'

export interface ITranslateService {
	execute(book: HtmlParserResultDTO[]): Promise<Result<BookChapterDTO[]>>
	translate(text: string): Promise<string>
}

export class TranslateService implements ITranslateService {
	public async execute(book: HtmlParserResultDTO[]): Promise<Result<BookChapterDTO[]>> {
		try {
			const res = await this.getBookTranslate(book)
			return Result.ok<BookChapterDTO[]>(res)
		} catch (e) {
			return Result.fail<BookChapterDTO[]>(e)
		}
	}

	public async translate(text: string) {
		return this.translateSentence(text)
	}

	private getBookTranslate = async (book: HtmlParserResultDTO[]): Promise<BookChapterDTO[]> => {
		const res: BookChapterDTO[] = []
		for (const [i, ch] of book.entries()) {
			console.log(i, ' of ', book.length)
			const paragraph = await this.translateChapter(ch.chapter, i, book.length)
			res.push({ name: ch.name, paragraph })
		}
		return res
	}

	private translateSentence = async (text: string): Promise<string> => {
		text = text.replace(/[^\w ]/gm, '')
		try {
			const { data } = await axios.get(`https://translate.google.com/m?sl=en&tl=ru&q=${encodeURIComponent(text)}`)
			const document = new JSDOM(data).window.document
			const translation = document.querySelector('.result-container').textContent ?? ''
			console.log(translation)
			return translation
		} catch (e) {
			return ''
		}
	}

	private translateChapter = async (
		chapters: ParsedChapterDTO[],
		ind: number,
		total: number
	): Promise<BookChapterElementDTO[]> => {
		const res: BookChapterElementDTO[] = []
		for (const [i, ch] of chapters.entries()) {
			console.log(ind, '_', i, ' of ', total)
			res.push({
				...ch,
				translate: await this.translateSentence(ch.originalText),
				translateDict: {},
			})
		}
		return res
	}
}
