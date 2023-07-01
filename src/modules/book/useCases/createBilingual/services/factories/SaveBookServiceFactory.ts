import { Notifier } from '../../../../../../infra/ws/Notifier'
import { SaveBookService } from '../SaveBookService'
import { ISaveChaptersService } from '../SaveChaptersService'
import { IFactory } from '../../../../../../shared/types/IFactory'

export class SaveBookServiceFactory implements IFactory<SaveBookService> {
	constructor(private saveChaptersService: ISaveChaptersService, private notify: Notifier) {}

	public create(userId: string) {
		return new SaveBookService(userId, this.saveChaptersService, this.notify)
	}
}
