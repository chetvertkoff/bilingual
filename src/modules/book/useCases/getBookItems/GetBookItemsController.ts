import { BaseController } from '../../../../core/infra/BaseController'
import { GetBookItemsUseCase } from './GetBookItemsUseCase'

export class GetBookItemsController extends BaseController {
	constructor(private getBookItemsUseCase: GetBookItemsUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getBookItemsUseCase.execute({
				userId: this.userId,
			})

			if (!res.success) return this.fail(res.error)

			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
