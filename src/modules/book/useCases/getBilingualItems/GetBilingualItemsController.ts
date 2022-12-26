import { BaseController } from '../../../../core/infra/BaseController'
import { GetBilingualItemsUseCase } from './GetBilingualItemsUseCase'

export class GetBilingualItemsController extends BaseController {
	constructor(private getBilingualItemsUseCase: GetBilingualItemsUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getBilingualItemsUseCase.execute({
				userId: this.userId,
			})
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
