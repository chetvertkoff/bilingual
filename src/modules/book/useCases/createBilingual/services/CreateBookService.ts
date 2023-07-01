import { CreateBilingualError } from '../CreateBilingualError'
import { ISaveChaptersService } from './SaveChaptersService'
import { Notifier } from '../../../../../infra/ws/Notifier'
import { Result } from '../../../../../shared'
import { BookDomain } from '../../../domain'

export class CreateBookService {
	constructor(private userId: string, private saveChaptersService: ISaveChaptersService, private notify: Notifier) {}

	public async execute() {
		const bookRes = await this.saveChaptersService.getNewBook(+this.userId)
		if (!bookRes.success) {
			this.notify.send(this.userId, new CreateBilingualError.BookSaveError())
			return Result.fail<BookDomain>()
		}
		return bookRes
	}
}
