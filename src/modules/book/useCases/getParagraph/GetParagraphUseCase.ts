import { UseCase } from '../../../../core/domain/UseCase'
import { IParagraphRepo } from '../../repos/ParagraphRepo'
import { GetParagraphError } from './GetParagraphError'
import { GetParagraphParams } from './GetParagraphParams'

interface Props {
	userId: string
	params: GetParagraphParams
}
export class GetParagraphUseCase implements UseCase<Props, any> {
	constructor(private paragraphRepo: IParagraphRepo) {}

	async execute({ userId, params }: Props) {
		const res = await this.paragraphRepo.getParagraphByParamsQuery(userId, params)
		if (!res.success) return new GetParagraphError.ParagraphQueryError()
		return res
	}
}
