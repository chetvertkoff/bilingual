import { BaseController } from '../../../../core/infra/BaseController'
import { GetBilingualUseCase } from './GetBilingualUseCase'

export class GetBilingualController extends BaseController {
	constructor(private getBilingualUseCase: GetBilingualUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const res = await this.getBilingualUseCase.execute({
				id: this.req.params.id,
				userId: this.userId,
			})
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
