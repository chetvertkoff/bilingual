import { UseCase } from '../../../../shared/domain/UseCase'
import { Result } from '../../../../shared/helpers/Result'
import { Notifier } from '../../../../infra/ws/Notifier'
import { IMediator } from '../../../../shared/infra'
import { CreateBilingualEvents } from './constants'
import { v4 as uuidv4 } from 'uuid'
import { CreateBookServiceFactory } from './services/factories/CreateBookServiceFactory'
import { ParseBookServiceFactory } from './services/factories/ParseBookServiceFactory'
import { TranslateBookServiceFactory } from './services/factories/TranslateBookServiceFactory'
import { SaveBookServiceFactory } from './services/factories/SaveBookServiceFactory'

interface Props {
	bookPath: string
	userId: string
}

export class CreateBilingualUseCase implements UseCase<Props, Promise<void>> {
	constructor(
		private notify: Notifier,
		private mediator: IMediator,
		private createBookServiceFactory: CreateBookServiceFactory,
		private parseBookServiceFactory: ParseBookServiceFactory,
		private translateBookServiceFactory: TranslateBookServiceFactory,
		private saveBookServiceFactory: SaveBookServiceFactory
	) {}

	public async execute({ userId, bookPath }: Props) {
		const eventId = `${CreateBilingualEvents.CHAPTER_TRANSLATE_PROGRESS}${uuidv4()}`

		const createBook = this.createBookServiceFactory.create(userId)
		const parseBook = this.parseBookServiceFactory.create(userId, bookPath)
		const translateBook = this.translateBookServiceFactory.create(userId, eventId)
		const saveBook = this.saveBookServiceFactory.create(userId)

		try {
			const book = await createBook.execute()
			if (!book.success) return

			const parsedBook = await parseBook.execute(book.value)
			if (!parsedBook.success) return

			const translatedChapters = await translateBook.execute(parsedBook.value, book.value.id)
			if (!translatedChapters.success) return

			await saveBook.execute(book.value.id, translatedChapters.value)
		} catch (e) {
			this.notify.send(userId, Result.fail(new Error(e)))
		} finally {
			this.mediator.unsubscribe(eventId)
		}
	}
}
