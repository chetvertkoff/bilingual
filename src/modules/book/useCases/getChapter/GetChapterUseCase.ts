import { UseCase } from '../../../../shared/domain/UseCase'
import { GetChapterParams } from './GetChapterParams'
import { IChapterRepo } from '../../repos/ChapterRepo'
import { GetChapterError } from './GetChapterError'
import { Result } from '../../../../shared'
import { GetChapterResponse } from './GetChapterResponse'

interface Props {
	userId: string
	params: GetChapterParams
}
export class GetChapterUseCase implements UseCase<Props, any> {
	constructor(private chapterRepo: IChapterRepo) {}

	async execute({ userId, params }: Props) {
		const res = await Promise.all([
			this.chapterRepo.getChaptersByParamsQuery(+userId, params),
			this.chapterRepo.getChapterCountQuery(+params.book_id, +userId),
			this.chapterRepo.getFirstChapterQuery(+params.book_id, +userId),
			this.chapterRepo.getLastChapterQuery(+params.book_id, +userId),
		])
		if (res.some((item) => !item.success)) return new GetChapterError.ChapterQueryError()

		const [chaptersRes, countRes, firstRes, lastRes] = res
		return Result.ok(new GetChapterResponse(chaptersRes.value, countRes.value, firstRes.value, lastRes.value))
	}
}
