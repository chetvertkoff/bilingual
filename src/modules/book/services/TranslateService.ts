import { HtmlParserResultDTO, ParsedChapterDTO } from './HtmlParseService'
import { Result } from '../../../core/helpers/Result'
import { BookChapterDTO, BookChapterElementDTO } from '../useCases/getBilingual/GetBilingualDTO'
import axios from 'axios'

export interface ITranslateService {
	execute(book: HtmlParserResultDTO[]): Promise<Result<BookChapterDTO[]>>
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

	private getBookTranslate = async (book: HtmlParserResultDTO[]): Promise<BookChapterDTO[]> => {
		const res: BookChapterDTO[] = []
		for (const [i, ch] of book.entries()) {
			console.log(i, ' of ', book.length)
			const chapter = await this.translateChapter(ch.chapter, i, book.length)
			res.push({ ...ch, chapter })
		}
		return res
	}

	private translateSentence = async (text: string): Promise<string> => {
		text = text.replace(/[^\w ]/gm, '')
		try {
			const {
				data: { translation },
			} = await axios.get<{ translation: string }>(`http://localhost:3000/api/v1/en/ru/${text}`)

			return translation
		} catch (e) {
			console.log(text)
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
