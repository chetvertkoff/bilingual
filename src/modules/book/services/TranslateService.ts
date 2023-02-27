import { HtmlParserResultDTO, ParsedChapterDTO } from './HtmlParseService'
import { Result } from '../../../core/helpers/Result'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { ChapterDomain, ParagraphDomain } from '../domain'
import { IObserver } from '../../../core/infra'

export interface ITranslateService {
	execute(eventId: string, book: HtmlParserResultDTO[]): Promise<Result<ChapterDomain[]>>
	translate(text: string): Promise<string>
}

export class TranslateService implements ITranslateService {
	constructor(private observer: IObserver) {}

	public async execute(eventId: string, book: HtmlParserResultDTO[]): Promise<Result<ChapterDomain[]>> {
		try {
			const res = await this.getBookTranslate(book, eventId)
			return Result.ok<ChapterDomain[]>(res)
		} catch (e) {
			return Result.fail<ChapterDomain[]>(e)
		}
	}

	public async translate(text: string) {
		return this.translateSentence(text)
	}

	private getBookTranslate = async (
		book: HtmlParserResultDTO[],
		onChapterTranslateEventId: string
	): Promise<ChapterDomain[]> => {
		const res: ChapterDomain[] = []
		for (const [i, ch] of book.entries()) {
			// console.log(i, ' of ', book.length)
			const paragraphs = await this.translateChapter(ch.chapter, i, book.length)
			res.push(new ChapterDomain({ name: ch.name, paragraphs }))
			this.observer.dispatch(onChapterTranslateEventId, { chapterIndex: i, chapterCount: book.length })
		}
		return res
	}

	private translateSentence = async (text: string): Promise<string> => {
		text = text.replace(/[^\w ]/gm, '')
		try {
			const { data } = await axios.get(`https://translate.google.com/m?sl=en&tl=ru&q=${encodeURIComponent(text)}`)
			const document = new JSDOM(data).window.document
			const translation = document.querySelector('.result-container').textContent ?? ''
			return translation
		} catch (e) {
			return ''
		}
	}

	private translateChapter = async (
		chapters: ParsedChapterDTO[],
		ind: number,
		total: number
	): Promise<ParagraphDomain[]> => {
		const res: ParagraphDomain[] = []
		for (const [i, ch] of chapters.entries()) {
			// console.log(ind, '_', i, ' of ', total)
			res.push(
				new ParagraphDomain({
					...ch,
					translate: await this.translateSentence(ch.originalText),
				})
			)
		}
		return res
	}
}
