import { EntityManager } from 'typeorm'
import { Result } from '../../../shared'
import { GetChapterParams } from '../useCases/getChapter/GetChapterParams'
import { Chapter } from '../../../infra/db/entity/Chapter'
import { Book } from '../../../infra/db/entity/Book'
import { ChapterMap } from '../mappers'
import { ChapterDomain } from '../domain'

export interface IChapterRepo {
	getChaptersByParamsQuery(userID: number, params: GetChapterParams): Promise<Result<ChapterDomain[]>>
	getChapterCountQuery(bookId: number, userId: number): Promise<Result<number>>
	getFirstChapterQuery(bookId: number, userId: number): Promise<Result<ChapterDomain>>
	getLastChapterQuery(bookId: number, userId: number): Promise<Result<ChapterDomain>>
	saveCommand(chapter: ChapterDomain, book: Book): Promise<Result>
}
export class ChapterRepo implements IChapterRepo {
	constructor(private db: EntityManager) {}

	private get repo() {
		return this.db.connection.manager.getRepository(Chapter)
	}

	public async saveCommand(chapter: ChapterDomain, book: Book): Promise<Result> {
		try {
			await this.repo.save({ book, ...ChapterMap.toDb(chapter) })

			return Result.ok()
		} catch (e) {
			console.log(e)
			return Result.fail(e)
		}
	}

	public async getLastChapterQuery(bookId: number, userId: number): Promise<Result<ChapterDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { book: { id: bookId, user: { id: userId } } },
				order: { id: 'DESC' },
			})

			return Result.ok<ChapterDomain>(ChapterMap.toDomain(item))
		} catch (e) {
			return Result.fail<ChapterDomain>(e)
		}
	}

	public async getFirstChapterQuery(bookId: number, userId: number): Promise<Result<ChapterDomain>> {
		try {
			const res = await this.repo.findOne({
				where: {
					book: { id: bookId, user: { id: userId } },
				},
			})

			return Result.ok<ChapterDomain>(ChapterMap.toDomain(res))
		} catch (e) {
			return Result.fail<ChapterDomain>(e)
		}
	}

	public async getChaptersByParamsQuery(userID: number, params: GetChapterParams) {
		try {
			const res = await this.repo.find({
				where: {
					id: params.id ? +params.id : params.getFindOperatorByKey('id'),
					book: { id: +params.book_id, user: { id: userID } },
				},
				skip: +params.skip,
				take: +params.take,
			})

			return Result.ok<ChapterDomain[]>(res.map((item) => ChapterMap.toDomain(item)))
		} catch (e) {
			return Result.fail<ChapterDomain[]>(e)
		}
	}

	public async getChapterCountQuery(bookId: number, userId: number): Promise<Result<number>> {
		try {
			const count = await this.repo.count({
				where: {
					book: { id: bookId, user: { id: userId } },
				},
			})

			return Result.ok<number>(count)
		} catch (e) {
			return Result.fail<number>(e)
		}
	}
}
