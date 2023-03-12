import { UseCase } from '../../../../core/domain/UseCase'
import { IParagraphRepo } from '../../repos/ParagraphRepo'
import { GetParagraphError } from './GetParagraphError'
import { GetParagraphParams } from './GetParagraphParams'
import { Result } from '../../../../core'
import { GetParagraphResponse } from './GetParagraphResponse'

interface Props {
	userId: string
	params: GetParagraphParams
}
export class GetParagraphUseCase
	implements UseCase<Props, Promise<GetParagraphError.ParagraphQueryError | Result<GetParagraphResponse>>>
{
	constructor(private paragraphRepo: IParagraphRepo) {}

	async execute({ userId, params }: Props) {
		const res = await Promise.all([
			this.paragraphRepo.getParagraphItemsByParamsQuery(+userId, params),
			this.paragraphRepo.getParagraphCountQuery(+userId, +params.book_id, +params.chapter_id),
			this.paragraphRepo.getFirstParagraphQuery(+userId, +params.book_id, +params.chapter_id),
			this.paragraphRepo.getLastParagraphQuery(+userId, +params.book_id, +params.chapter_id),
		])

		if (res.some((item) => !item.success)) return new GetParagraphError.ParagraphQueryError()

		const [items, count, first, last] = res

		return Result.ok(new GetParagraphResponse(items.value, count.value, first.value, last.value))
	}
}
