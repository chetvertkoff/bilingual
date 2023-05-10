import { IBookRepo } from '../../../repos/BookRepo'
import { IChapterRepo } from '../../../repos/ChapterRepo'
import { IParagraphRepo } from '../../../repos/ParagraphRepo'
import { BookDomain, ChapterDomain } from '../../../domain'
import { Result } from '../../../../../core'
import { IUserRepo } from '../../../repos/UserRepo'
import { BookMap, ChapterMap, UserMap } from '../../../mappers'

export interface ISaveChaptersService {
	getNewBook(userId: number): Promise<Result<BookDomain>>
	saveChaptersWithParagraphs(userId: number, bookId: number, chapters: ChapterDomain[]): Promise<Result>
}
export class SaveChaptersService implements ISaveChaptersService {
	constructor(
		private userRepo: IUserRepo,
		private bookRepo: IBookRepo,
		private chapterRepo: IChapterRepo,
		private paragraphRepo: IParagraphRepo
	) {}

	public async getNewBook(userId: number): Promise<Result<BookDomain>> {
		const user = await this.userRepo.getUserByIdQuery(userId)
		if (!user.success) return Result.fail()

		await this.bookRepo.startTransaction()
		const bookSaveRes = await this.bookRepo.saveCommand(BookDomain.create({ progress: 1 }), UserMap.toDb(user.value))

		if (!bookSaveRes.success) {
			await this.bookRepo.rollBackTransaction()
			return Result.fail()
		}
		await this.bookRepo.commitTransaction()

		const bookRes = await this.bookRepo.getLastBookQuery(userId)
		if (!bookRes.success) return Result.fail()
		return bookRes
	}

	public async saveChaptersWithParagraphs(userId: number, bookId: number, chapters: ChapterDomain[]): Promise<Result> {
		const bookRes = await this.bookRepo.getBookByIdQuery(bookId, userId)
		if (!bookRes.success) return Result.fail()

		await this.bookRepo.startTransaction()

		for (const ch of chapters) {
			const saveChapterRes = await this.chapterRepo.saveCommand(ch, BookMap.toDb(bookRes.value))
			if (!saveChapterRes.success) {
				await this.bookRepo.rollBackTransaction()
				return Result.fail()
			}

			const chapterRes = await this.chapterRepo.getLastChapterQuery(bookId, userId)
			if (!chapterRes.success) {
				await this.bookRepo.rollBackTransaction()
				return Result.fail()
			}

			for (const p of ch.paragraphs) {
				const paragraphRes = await this.paragraphRepo.saveCommand(p, ChapterMap.toDb(chapterRes.value))
				if (!paragraphRes.success) {
					await this.bookRepo.rollBackTransaction()
					return Result.fail()
				}
			}
		}

		const user = await this.userRepo.getUserByIdQuery(userId)
		if (!user.success) {
			await this.bookRepo.rollBackTransaction()
			return Result.fail()
		}

		const bookSaveRes = await this.bookRepo.saveCommand(
			BookDomain.create({ ...bookRes.value, id: bookId, progress: null }),
			UserMap.toDb(user.value)
		)
		if (!bookSaveRes.success) {
			await this.bookRepo.rollBackTransaction()
			return Result.fail()
		}

		await this.bookRepo.commitTransaction()

		return Result.ok()
	}
}
