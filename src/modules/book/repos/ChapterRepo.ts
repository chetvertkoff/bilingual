import { EntityManager } from 'typeorm'
import { Result } from '../../../core'
import { GetChapterResponse } from '../useCases/getChapter/GetChapterResponse'
import { GetChapterParams } from '../useCases/getChapter/GetChapterParams'
import { Chapter } from '../../../infra/db/entity/Chapter'

export interface IChapterRepo {
	getChapter(userID: string, params: GetChapterParams): Promise<Result<GetChapterResponse>>
}
export class ChapterRepo implements IChapterRepo {
	constructor(private db: EntityManager) {}

	public async getChapter(userID: string, params: GetChapterParams) {
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
