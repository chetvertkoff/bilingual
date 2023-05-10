import { EPub } from 'epub2'
import { BookReaderResult, BookReaderResultDTO, IBookReaderService } from './BookReaderService'
import { Result } from '../../../core/helpers/Result'

export class BookReaderEpubService implements IBookReaderService {
	public async execute(bookPath: string): Promise<Result<BookReaderResult>> {
		try {
			const epub = await EPub.createAsync(bookPath)
			const imgs = epub.listImage()
			const buf = imgs[0]?.id ? await epub.getImageAsync(imgs[0]?.id) : null
			const chapters = epub.flow
				.map(({ id }) => id && this.getChapter(id, epub))
				.filter((chapter) => chapter) as Promise<BookReaderResultDTO>[]

			return Result.ok<BookReaderResult>({ chapters, cover: buf?.data ?? null })
		} catch (e) {
			return Result.fail<BookReaderResult>(e)
		}
	}

	private getChapter = async (id: string, epub: EPub): Promise<BookReaderResultDTO> => {
		return {
			id,
			html: await epub.getChapterAsync(id),
		}
	}
}
