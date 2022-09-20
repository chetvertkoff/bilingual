// export interface INotifyService {}
import { Notifyer } from '../../../infra/ws/Notifyer'

export interface INotifyService {
	saveSuccess: (userId: string, message: Record<string, any>) => Promise<void>
}

export class NotifyService implements INotifyService {
	constructor(private notifyer: Notifyer, private userId: string) {}

	public async saveSuccess() {
		this.notifyer.send(this.userId, { message: 'привет' }).then()
	}
}

export type NotifyFactory = (userId: string) => INotifyService

export const notifyServiceFactory = (notifyer: Notifyer) => (userId: string) => new NotifyService(notifyer, userId)
