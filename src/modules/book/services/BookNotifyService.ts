import { Notifyer } from '../../../infra/ws/Notifyer'
import { Result } from '../../../core/helpers/Result'

export interface IBookNotifyService {
	sendMessage: (message: Result<unknown>) => void
}

export class BookNotifyService implements IBookNotifyService {
	constructor(private notifyer: Notifyer, private userId: string) {}

	public sendMessage(message: Result<unknown>) {
		this.notifyer.send(this.userId, message).then()
	}
}

export type BookNotifyFactory = (userId: string) => IBookNotifyService

export const bookNotifyServiceFactory = (notifyer: Notifyer) => (userId: string) =>
	new BookNotifyService(notifyer, userId)
