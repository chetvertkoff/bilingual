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
			})
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
