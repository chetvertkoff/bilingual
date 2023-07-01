import { CreateBilingualError } from '../CreateBilingualError'
import { Result } from '../../../../../shared'
import { WsResponse } from '../../../../../shared/infra'
import { WsEvents } from '../../../../../shared/constants'
import { ISaveChaptersService } from './SaveChaptersService'
import { ChapterDomain } from '../../../domain'
import { Notifier } from '../../../../../infra/ws/Notifier'

export class SaveBookService {
	constructor(private userId: string, private saveChaptersService: ISaveChaptersService, private notify: Notifier) {}

	async execute(bookId: number, translatedChapters: ChapterDomain[]) {
		const saveProgress = await this.saveChaptersService.saveChaptersWithParagraphs(
			+this.userId,
			bookId,
			translatedChapters
		)

		if (!saveProgress.success) {
			this.notify.send(this.userId, new CreateBilingualError.BookSaveError())
			return Result.fail()
		}

		this.notify.send(this.userId, Result.ok(new WsResponse(WsEvents.BOOK_TRANSLATED)))

		return Result.ok()
	}
}
