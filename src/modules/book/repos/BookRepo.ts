import { EntityManager } from 'typeorm'
import { Users } from '../../../infra/db/entity/Users'
import { Book } from '../../../infra/db/entity/Book'
import { Chapter } from '../../../infra/db/entity/Chapter'
import { Paragraph } from '../../../infra/db/entity/Paragraph'
import { BilingualDTO } from '../useCases/createBilingual/CreateBilingualDTO'
import { BookMap } from '../mappers/BookMap'
import { ChapterMap } from '../mappers/ChapterMap'
import { ParagraphMap } from '../mappers/ParagraphMap'
import { Result } from '../../../core/helpers/Result'

export interface IBookRepo {
	save(book: BilingualDTO, userID: number): Promise<Result>
	getBilingualItem(id: string, userId: string): Promise<Result<Book | Error>>
	getBilingualItems(userId: string): Promise<Result<Book[] | Error>>
}

export class BookRepo implements IBookRepo {
	constructor(private db: EntityManager) {}

	public async save(book: BilingualDTO, userID: number): Promise<Result> {
		// TODO применить декоратор
		const { db } = this
		const queryRunner = db.connection.createQueryRunner()
		try {
			await queryRunner.connect()
			const { manager } = queryRunner

			const userRepo = manager.getRepository(Users)
			const bookRepo = manager.getRepository(Book)
			const chapterRepo = manager.getRepository(Chapter)
			const paragraphRepo = manager.getRepository(Paragraph)

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

			const paragraphs = chapters
				.map((ch) =>
					ch.paragraph.map((item) => {
						ch.paragraph && delete ch.paragraph
						return ParagraphMap.toDb({ ...item, chapter: ch })
					})
				)
				.flat()

			await paragraphRepo.save(paragraphs)

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

	public async getBilingualItem(id: string, userId: string) {
		const { manager } = this.db.connection

		try {
			const bookRepo = manager.getRepository(Book)
			const item = await bookRepo.findOne({
				where: { id: +id, user: { id: +userId } },
				relations: {
					chapters: {
						paragraphs: true,
					},
				},
			})

			return Result.ok(item)
		} catch (e) {
			return Result.fail(e)
		}
	}

	public async getBilingualItems(userId: string) {
		const { manager } = this.db.connection

		try {
			const bookRepo = manager.getRepository(Book)
			const items = await bookRepo.find({
				where: { user: { id: +userId } },
			})
			return Result.ok(items)
		} catch (e) {
			return Result.fail(e)
		}
	}
}
