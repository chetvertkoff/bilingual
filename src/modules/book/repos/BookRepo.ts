import { EntityManager } from 'typeorm'
import { Users } from '../../../infra/db/entity/Users'
import { Book } from '../../../infra/db/entity/Book'
import { BookMap } from '../mappers/BookMap'
import { Result } from '../../../core/helpers/Result'
import { BookDomain } from '../domain'
import { BaseRepo, IBaseRepo } from '../../../core/infra'

export interface IBookRepo extends IBaseRepo {
	saveCommand(book: BookDomain, user: Users): Promise<Result>
	getLastBookQuery(userId: number): Promise<Result<BookDomain>>
	getBookByIdQuery(bookId: number): Promise<Result<BookDomain>>
	getBilingualItem(id: string, userId: string): Promise<Result<Book>>
	getBilingualItems(userId: string): Promise<Result<Book[]>>
}

export class BookRepo extends BaseRepo implements IBookRepo {
	constructor(db: EntityManager) {
		super(db)
	}

	private get repo() {
		return this.db.connection.manager.getRepository(Book)
	}

	public async saveCommand(book: BookDomain, user: Users): Promise<Result> {
		try {
			await this.repo.save({ user, ...BookMap.toDb(book) })

			return Result.ok()
		} catch (e) {
			console.log(e)
			return Result.fail(e)
		}
	}

	public async getLastBookQuery(userId: number): Promise<Result<BookDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { user: { id: +userId } },
				order: { id: 'DESC' },
			})

			return Result.ok<BookDomain>(BookMap.toDomain(item))
		} catch (e) {
			return Result.fail<BookDomain>(e)
		}
	}

	public async getBookByIdQuery(bookId: number): Promise<Result<BookDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { id: bookId },
			})

			return Result.ok<BookDomain>(BookMap.toDomain(item))
		} catch (e) {
			return Result.fail<BookDomain>(e)
		}
	}

	public async getBilingualItem(id: string, userId: string) {
		const { manager } = this.db.connection

		try {
			const bookRepo = manager.getRepository(Book)
			const item = await bookRepo.findOne({
				where: { id: +id, user: { id: +userId } },
			})

			return Result.ok<Book>(item)
		} catch (e) {
			return Result.fail<Book>(e)
		}
	}

	public async getBilingualItems(userId: string) {
		const { manager } = this.db.connection

		try {
			const bookRepo = manager.getRepository(Book)
			const items = await bookRepo.find({
				where: { user: { id: +userId } },
			})
			return Result.ok<Book[]>(items)
		} catch (e) {
			return Result.fail<Book[]>(e)
		}
	}
}
