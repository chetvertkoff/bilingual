import { EntityManager } from 'typeorm'
import { Users } from '../../../infra/db/entity/Users'
import { Book } from '../../../infra/db/entity/Book'
import { Chapter } from '../../../infra/db/entity/Chapter'
import { ChapterFull } from '../../../infra/db/entity/ChapterFull'
import { BilingualDTO } from '../useCases/createBilingual/CreateBilingualDTO'
import { BookMap } from '../mapper/BookMap'
import { ChapterMap } from '../mapper/ChapterMap'
import { ChapterFullMap } from '../mapper/ChapterFullMap'
import { Result } from '../../../core/helpers/Result'

export interface IBookRepo {
	save(book: BilingualDTO, userID: number): Promise<Result<unknown>>
}

export class BookRepo implements IBookRepo {
	constructor(private db: EntityManager) {}

	public async save(book: BilingualDTO, userID: number): Promise<Result<unknown>> {
		try {
			const { db } = this

			const userRepo = db.getRepository(Users)
			const bookRepo = db.getRepository(Book)
			const chapterRepo = db.getRepository(Chapter)
			const chapterFullRepo = db.getRepository(ChapterFull)

			const user = await userRepo.findOneBy({
				id: userID,
			})
			const bookModel = BookMap.toDb({ ...book, user })

			await bookRepo.save(bookModel)

			const chapters = book.chapters.map((item) => {
				bookModel.chapters && delete bookModel.chapters
				return ChapterMap.toDb({ ...item, book: bookModel })
			})

			await chapterRepo.save(chapters)

			const chaptersFull = chapters
				.map((ch) =>
					ch.chapterFull.map((item) => {
						ch.chapterFull && delete ch.chapterFull
						return ChapterFullMap.toDb({ ...item, chapter: ch })
					})
				)
				.flat()

			await chapterFullRepo.save(chaptersFull)

			return Result.ok()
		} catch (e) {
			return Result.fail(e)
		}
	}
}
