import { EntityManager } from 'typeorm'
import { Result } from '../../../core'
import { GetChapterResponse } from '../useCases/getChapter/GetChapterResponse'
import { GetChapterParams } from '../useCases/getChapter/GetChapterParams'
import { Chapter } from '../../../infra/db/entity/Chapter'
import { Book } from '../../../infra/db/entity/Book'
import { BookMap, ChapterMap, ParagraphMap } from '../mappers'
import { Paragraph } from '../../../infra/db/entity/Paragraph'
import { BookChapterDTO } from '../useCases/createBilingual/CreateBilingualDTO'
import { BookDomain, ChapterDomain, ParagraphDomain } from '../domain'
import { Users } from '../../../infra'

export interface IChapterRepo {
	getChapterByParamsQuery(userID: string, params: GetChapterParams): Promise<Result<GetChapterResponse>>
	getChapterByIdQuery(id: number): Promise<Result<ChapterDomain>>
	getLastChapterQuery(bookId: number): Promise<Result<ChapterDomain>>
	saveCommand(chapter: ChapterDomain, book: Book): Promise<Result>
}
export class ChapterRepo implements IChapterRepo {
	constructor(private db: EntityManager) {}

	private get repo() {
		return this.db.connection.manager.getRepository(Chapter)
	}

	public async saveCommand(chapter: ChapterDomain, book: Book): Promise<Result> {
		const { db } = this
		const queryRunner = db.connection.createQueryRunner()
		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()

			await this.repo.save({ book, ...ChapterMap.toDb(chapter) })

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

	public async getChapterByIdQuery(id: number): Promise<Result<ChapterDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { id },
			})

			return Result.ok<ChapterDomain>(ChapterMap.toDomain(item))
		} catch (e) {
			return Result.fail<ChapterDomain>(e)
		}
	}

	public async getLastChapterQuery(bookId: number): Promise<Result<ChapterDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { book: { id: bookId } },
				order: { id: 'DESC' },
			})

			return Result.ok<ChapterDomain>(ChapterMap.toDomain(item))
		} catch (e) {
			return Result.fail<ChapterDomain>(e)
		}
	}

	public async getChapterByParamsQuery(userID: string, params: GetChapterParams) {
		const { manager } = this.db.connection

		try {
			const chapterRepo = manager.getRepository(Chapter)

			const res = await Promise.all([
				chapterRepo.find({
					where: {
						id: params.id ? +params.id : params.getFindOperatorByKey('id'),
						book: { id: +params.book_id, user: { id: +userID } },
					},
					skip: +params.skip,
					take: +params.take,
				}),
				chapterRepo.count({
					where: {
						book: { id: +params.book_id, user: { id: +userID } },
					},
				}),
				chapterRepo.findOne({
					where: {
						book: { id: +params.book_id, user: { id: +userID } },
					},
				}),
				chapterRepo.findOne({
					where: {
						book: { id: +params.book_id, user: { id: +userID } },
					},
					order: { id: 'DESC' },
				}),
			])

			return Result.ok<GetChapterResponse>(new GetChapterResponse(res[0], res[1], res[2], res[3]))
		} catch (e) {
			return Result.fail<GetChapterResponse>(e)
		}
	}
}
