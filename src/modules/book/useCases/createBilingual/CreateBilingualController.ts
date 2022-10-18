import { CreateBilingualUseCase } from './CreateBilingualUseCase'
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

export class CreateBilingualController extends BaseController {
	constructor(private createBilingualUseCase: CreateBilingualUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			const bookName = uuidv4() as string
			const bookPath = path.join(__basedir, `/upload/book/${bookName}.epub`)
			const userId = String(this.req.query.userId)

			await this.uploadStreamFile(bookPath)
			this.createBilingualUseCase.execute({ bookPath, userId }).then()

			return this.ok(this.res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
