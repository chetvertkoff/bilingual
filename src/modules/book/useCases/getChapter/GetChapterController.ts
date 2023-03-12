import { BaseController } from '../../../../core/infra/BaseController'
import { GetChapterUseCase } from './GetChapterUseCase'
import { GetChapterParams } from './GetChapterParams'

export class GetChapterController extends BaseController {
	constructor(private getChapterUseCase: GetChapterUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getChapterUseCase.execute({
				userId: this.userId,
				params: new GetChapterParams(this.req.query),
			})
			if (!res.success) return this.fail(res.error, res.errorCode)
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
