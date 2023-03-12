import { BaseController } from '../../../../core/infra/BaseController'
import { GetBookUseCase } from './GetBookUseCase'

export class GetBookController extends BaseController {
	constructor(private getBookUseCase: GetBookUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getBookUseCase.execute({
				id: this.req.params.id,
				userId: +this.userId,
			})

			if (!res.success) return this.fail(res.error, res.errorCode)
			return this.ok(this.res, res.value)
		} catch (e) {
			return this.fail(e)
		}
	}
}
