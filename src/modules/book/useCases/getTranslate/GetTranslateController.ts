import { BaseController } from '../../../../core/infra/BaseController'
import { ITranslateService } from '../../services/TranslateService'

export class GetTranslateController extends BaseController {
	constructor(private translateService: ITranslateService) {
		super()
	}

	public async executeImpl() {
		try {
			const text = (this.req.query.text as string) ?? ''
			const res = await this.translateService.translate(text)
			return this.ok(this.res, res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
