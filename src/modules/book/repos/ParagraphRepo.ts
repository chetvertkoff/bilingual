import { EntityManager } from 'typeorm'
import { Paragraph } from '../../../infra/db/entity/Paragraph'
import { Result } from '../../../core'
import { GetParagraphParams } from '../useCases/getParagraph/GetParagraphParams'
import { GetParagraphResponse } from '../useCases/getParagraph/GetParagraphResponse'
import { ParagraphDomain } from '../domain'
import { ParagraphMap } from '../mappers'
import { Chapter } from '../../../infra'

export interface IParagraphRepo {
	getParagraphByParamsQuery(userID: string, params: GetParagraphParams): Promise<Result<GetParagraphResponse>>
	getParagraphByIdQuery(id: number): Promise<Result<ParagraphDomain>>
	saveCommand(paragraph: ParagraphDomain, chapter: Chapter): Promise<Result>
}
export class ParagraphRepo implements IParagraphRepo {
	constructor(private db: EntityManager) {}

	private get repo() {
		return this.db.connection.manager.getRepository(Paragraph)
	}

	public async getParagraphByParamsQuery(userID: string, params: GetParagraphParams) {
		const { manager } = this.db.connection

		try {
			const paragraphRepo = manager.getRepository(Paragraph)

			const res = await Promise.all([
				paragraphRepo.find({
					where: {
						id: params.id ? +params.id : params.getFindOperatorByKey('id'),
						chapter: {
							id: +params.chapter_id,
							book: { id: +params.book_id, user: { id: +userID } },
						},
					},
					skip: +params.skip,
					take: +params.take,
				}),
				paragraphRepo.count({
					where: {
						chapter: {
							id: +params.chapter_id,
							book: { id: +params.book_id, user: { id: +userID } },
						},
					},
				}),
				paragraphRepo.findOne({
					where: {
						chapter: {
							id: +params.chapter_id,
							book: { id: +params.book_id, user: { id: +userID } },
						},
					},
				}),
				paragraphRepo.findOne({
					where: {
						chapter: {
							id: +params.chapter_id,
							book: { id: +params.book_id, user: { id: +userID } },
						},
					},
					order: { id: 'DESC' },
				}),
			])

			return Result.ok<GetParagraphResponse>(new GetParagraphResponse(res[0], res[1], res[2], res[3]))
		} catch (e) {
			return Result.fail<GetParagraphResponse>(e)
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
		const { db } = this
		const queryRunner = db.connection.createQueryRunner()
		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()

			await this.repo.save({ chapter, ...ParagraphMap.toDb(paragraph) })

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
