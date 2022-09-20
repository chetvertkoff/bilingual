import { GetBilingualUseCase } from './GetBilingualUseCase'
import { BaseController } from '../../../../core/infra/BaseController'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

/**
 * controller steps
 *
 * 1 return response
 * 2 upload book file
 * 3 read file
 * 4 delete file
 * 5 get bilingual
 * 6 save bilingual
 * 7 notificate user
 */

export class GetBilingualController extends BaseController {
	constructor(private getBilingualUseCase: GetBilingualUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const bookName = uuidv4() as string
			const filePath = path.join(__basedir, `/upload/book/${bookName}.epub`)
			const userId = String(this.req.query.userId)

			await this.uploadStreamFile(filePath)
			this.getBilingualUseCase.execute(filePath, userId).then()

			return this.ok(this.res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
