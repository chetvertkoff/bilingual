import { CreateBookService } from '../CreateBookService'
import { ISaveChaptersService } from '../SaveChaptersService'
import { Notifier } from '../../../../../../infra/ws/Notifier'
import { IFactory } from '../../../../../../shared/types/IFactory'

export class CreateBookServiceFactory implements IFactory<CreateBookService> {
	constructor(private saveChaptersService: ISaveChaptersService, private notify: Notifier) {}

	public create(userId: string) {
		return new CreateBookService(userId, this.saveChaptersService, this.notify)
	}
}
