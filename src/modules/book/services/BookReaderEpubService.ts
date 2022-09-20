import { EPub } from 'epub2'
import { BookReaderResult, BookReaderResultDTO, IBookReaderService } from './BookReaderService'
import { Result } from '../../../core/helpers/Result'

export class BookReaderEpubService implements IBookReaderService {
	public async execute(bookPath: string): Promise<Result<BookReaderResult>> {
		try {
			const epub = await EPub.createAsync(bookPath)
			const parsedBook = epub.flow
				.map(({ id }) => id && this.getChapter(id, epub))
				.filter((chapter) => chapter) as Promise<BookReaderResultDTO>[]
			return Result.ok<Promise<BookReaderResultDTO>[]>(parsedBook)
		} catch (e) {
			return Result.fail<Promise<BookReaderResultDTO>[]>(e)
		}
	}

	private getChapter = async (id: string, epub: EPub): Promise<BookReaderResultDTO> => {
		return {
			id,
			html: await epub.getChapterAsync(id),
		}
	}
}
