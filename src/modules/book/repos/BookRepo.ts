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
		// TODO применить декоратор
		const { db } = this
		const queryRunner = db.connection.createQueryRunner()
		try {
			await queryRunner.connect()
			const { manager } = queryRunner

			const userRepo = manager.getRepository(Users)
			const bookRepo = manager.getRepository(Book)
			const chapterRepo = manager.getRepository(Chapter)
			const chapterFullRepo = manager.getRepository(ChapterFull)

			const user = await userRepo.findOneBy({
				id: userID,
			})
			const bookModel = BookMap.toDb({ ...book, user })

			await queryRunner.startTransaction()

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

			await queryRunner.commitTransaction()

			return Result.ok()
		} catch (e) {
			console.log(e)
			await queryRunner.rollbackTransaction()
			return Result.fail(e)
		} finally {
			await queryRunner.release()
		}
	}
}
