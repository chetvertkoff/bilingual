import { EntityManager } from 'typeorm'
import { Paragraph } from '../../../infra/db/entity/Paragraph'
import { Result } from '../../../shared'
import { GetParagraphParams } from '../useCases/getParagraph/GetParagraphParams'
import { ParagraphDomain } from '../domain'
import { ParagraphMap } from '../mappers'
import { Chapter } from '../../../infra'

export interface IParagraphRepo {
	getLastParagraphQuery(userID: number, bookId: number, chapterId?: number): Promise<Result<ParagraphDomain>>
	getFirstParagraphQuery(userID: number, bookId: number, chapterId?: number): Promise<Result<ParagraphDomain>>
	getParagraphCountQuery(userID: number, bookId: number): Promise<Result<number>>
	getParagraphItemsByParamsQuery(userID: number, params: GetParagraphParams): Promise<Result<ParagraphDomain[]>>
	getParagraphByIdQuery(id: number): Promise<Result<ParagraphDomain>>
	saveCommand(paragraph: ParagraphDomain, chapter: Chapter): Promise<Result>
}
export class ParagraphRepo implements IParagraphRepo {
	constructor(private db: EntityManager) {}

	private get repo() {
		return this.db.connection.manager.getRepository(Paragraph)
	}

	public async getLastParagraphQuery(
		userID: number,
		bookId: number,
		chapterId?: number
	): Promise<Result<ParagraphDomain>> {
		try {
			const res = await this.repo.findOne({
				where: {
					chapter: {
						...(chapterId ? { id: chapterId } : {}),
						book: { id: bookId, user: { id: +userID } },
					},
				},
				order: { id: 'DESC' },
			})

			return Result.ok<ParagraphDomain>(ParagraphMap.toDomain(res))
		} catch (e) {
			return Result.fail<ParagraphDomain>(e)
		}
	}

	public async getFirstParagraphQuery(
		userID: number,
		bookId: number,
		chapterId?: number
	): Promise<Result<ParagraphDomain>> {
		try {
			const res = await this.repo.findOne({
				where: {
					chapter: {
						...(chapterId ? { id: chapterId } : {}),
						book: { id: bookId, user: { id: userID } },
					},
				},
			})

			return Result.ok<ParagraphDomain>(ParagraphMap.toDomain(res))
		} catch (e) {
			return Result.fail<ParagraphDomain>(e)
		}
	}

	public async getParagraphCountQuery(userID: number, bookId: number) {
		try {
			const res = await this.repo.count({
				where: {
					chapter: {
						book: { id: bookId, user: { id: userID } },
					},
				},
			})

			return Result.ok<number>(res)
		} catch (e) {
			return Result.fail<number>(e)
		}
	}

	public async getParagraphItemsByParamsQuery(userID: number, params: GetParagraphParams) {
		const id =
			params.id || params.getFindOperatorByKey('id')
				? { id: params.id ? +params.id : params.getFindOperatorByKey('id') }
				: {}

		try {
			const res = await this.repo.find({
				where: {
					...(id as { id: number }),
					chapter: {
						...(params.book_id ? { book: { id: +params.book_id, user: { id: userID } } } : {}),
						...(params.chapter_id ? { id: +params.chapter_id } : {}),
					},
				},
				skip: +params.skip,
				take: +params.take,
			})

			return Result.ok<ParagraphDomain[]>(res.map((item) => ParagraphMap.toDomain(item)))
		} catch (e) {
			return Result.fail<ParagraphDomain[]>(e)
		}
	}

	public async getParagraphByIdQuery(id: number): Promise<Result<ParagraphDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { id },
			})

			return Result.ok<ParagraphDomain>(ParagraphMap.toDomain(item))
		} catch (e) {
			return Result.fail<ParagraphDomain>(e)
		}
	}

	public async saveCommand(paragraph: ParagraphDomain, chapter: Chapter): Promise<Result> {
		try {
			await this.repo.save({ chapter, ...ParagraphMap.toDb(paragraph) })

			return Result.ok()
		} catch (e) {
			console.log(e)
			return Result.fail(e)
		}
	}
}
