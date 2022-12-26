import { CreateBilingualUseCase } from './CreateBilingualUseCase'
import { BaseController } from '../../../../core/infra/BaseController'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export class CreateBilingualController extends BaseController {
	constructor(private createBilingualUseCase: CreateBilingualUseCase) {
		super()
	}

	public async executeImpl() {
		try {
			// TODO добавить проверку на файл
			const bookName = uuidv4() as string
			const bookPath = path.join(__basedir, `/upload/book/${bookName}.epub`)

			await this.uploadStreamFile(bookPath)

			this.createBilingualUseCase.execute({ bookPath, userId: this.userId }).then()

			return this.ok(this.res)
		} catch (e) {
			return this.fail(e)
		}
	}
}
