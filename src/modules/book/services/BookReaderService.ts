import { BookReaderEpubService } from './BookReaderEpubService'
import { Result } from '../../../core/helpers/Result'
import { unlink } from 'fs/promises'

export interface BookReaderResultDTO {
	id: string
	html: string
}

export type BookReaderResult = Array<Promise<BookReaderResultDTO>>

export interface IBookReaderService {
	execute(bookPath: string): Promise<Result<BookReaderResult>>
}

export class BookReaderService implements IBookReaderService {
	private extensions: Map<string, BookReaderEpubService>

	constructor(private epubReader: BookReaderEpubService) {
		this.extensions = new Map([['epub', epubReader]])
	}

	public async execute(bookPath: string): Promise<Result<BookReaderResult>> {
		try {
			const extension = this.getExtensionFromFilePath(bookPath)
			const bookReader = this.extensions.get(extension)
			return bookReader.execute(bookPath)
		} catch (e) {
			return Result.fail<BookReaderResult>(e)
		} finally {
			unlink(bookPath).then()
		}
	}

	private getExtensionFromFilePath = (bookPath: string) => {
		return bookPath.split('/').pop().split('.').pop()
	}
}
