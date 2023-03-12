import { BaseController } from '../../../../core/infra/BaseController'
import { GetParagraphUseCase } from './GetParagraphUseCase'
import { GetParagraphParams } from './GetParagraphParams'

export class GetParagraphController extends BaseController {
	constructor(private getParagraphUseCase: GetParagraphUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getParagraphUseCase.execute({
				userId: this.userId,
				params: new GetParagraphParams(this.req.query),
			})
			if (!res.success) return this.fail(res.error, res.errorCode)
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
