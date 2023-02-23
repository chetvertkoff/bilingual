import { EntityManager } from 'typeorm'
import { Paragraph } from '../../../infra/db/entity/Paragraph'
import { Result } from '../../../core'
import { GetParagraphParams } from '../useCases/getParagraph/GetParagraphParams'
import { GetParagraphResponse } from '../useCases/getParagraph/GetParagraphResponse'

export interface IParagraphRepo {
	getParagraph(userID: string, params: GetParagraphParams): Promise<Result<GetParagraphResponse>>
}
export class ParagraphRepo implements IParagraphRepo {
	constructor(private db: EntityManager) {}

	public async getParagraph(userID: string, params: GetParagraphParams) {
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
}
