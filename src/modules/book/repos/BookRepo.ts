import { EntityManager } from 'typeorm'
import { Users } from '../../../infra/db/entity/Users'
import { Book } from '../../../infra/db/entity/Book'
import { BookMap } from '../mappers/BookMap'
import { Result } from '../../../core/helpers/Result'
import { BookDomain } from '../domain'
import { BaseParams, BaseRepo, IBaseRepo } from '../../../core/infra'

export interface IBookRepo extends IBaseRepo {
	saveCommand(book: BookDomain, user: Users): Promise<Result>
	getLastBookQuery(userId: number): Promise<Result<BookDomain>>
	getBookByIdQuery(bookId: number, userId: number): Promise<Result<BookDomain>>
	getBookItemsByUserIdQuery(userId: string, params: BaseParams): Promise<Result<BookDomain[]>>
	getBookItemCountByUserIdQuery(userId: string): Promise<Result<number>>
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

	public async getBookByIdQuery(bookId: number, userId: number): Promise<Result<BookDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { id: bookId, user: { id: userId } },
			})

			return Result.ok<BookDomain>(BookMap.toDomain(item))
		} catch (e) {
			return Result.fail<BookDomain>(e)
		}
	}

	public async getBookItemsByUserIdQuery(userId: string, params: BaseParams) {
		const conditionsByParams = {
			...(params?.id ? { id: +params?.id } : {}),
		}

		try {
			const items = await this.repo.find({
				where: { user: { id: +userId }, ...conditionsByParams },
				order: { id: params.order },
				skip: +params.skip,
				take: +params.take,
			})
			return Result.ok<BookDomain[]>(items.map((item) => BookMap.toDomain(item)))
		} catch (e) {
			return Result.fail<BookDomain[]>(e)
		}
	}

	public async getBookItemCountByUserIdQuery(userId: string): Promise<Result<number>> {
		try {
			const count = await this.repo.count({
				where: { user: { id: +userId } },
			})
			return Result.ok<number>(count)
		} catch (e) {
			return Result.fail<number>(e)
		}
	}
}
