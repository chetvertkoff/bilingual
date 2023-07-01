import { Notifier } from '../../../../../../infra/ws/Notifier'
import { IBookRepo } from '../../../../repos/BookRepo'
import { IFactory } from '../../../../../../shared/types/IFactory'
import { TranslateBookService } from '../TranslateBookService'
import { IMediator } from '../../../../../../shared/infra'
import { ITranslateService } from '../../../../services/TranslateService'
import { IUserRepo } from '../../../../repos/UserRepo'

export class TranslateBookServiceFactory implements IFactory<TranslateBookService> {
	constructor(
		private bookRepo: IBookRepo,
		private notify: Notifier,
		private mediator: IMediator,
		private translater: ITranslateService,
		private userRepo: IUserRepo
	) {}

	public create(userId: string, eventId: string) {
		return new TranslateBookService(
			userId,
			eventId,
			this.bookRepo,
			this.notify,
			this.mediator,
			this.translater,
			this.userRepo
		)
	}
}
