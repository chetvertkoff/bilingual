import { WebSocket } from 'ws'
import { IncomingMessage } from 'http'
import { Callback, Result, UseCaseError } from '../../core'
import { WsResponse } from '../../core/infra'
import { WsEvents } from '../../core/constants'

type Params = Record<string, string> & {
	userId: string
}

export class Notifier {
	private clients = new Map<string, Callback>()

	public addClient(client: WebSocket, req: IncomingMessage) {
		try {
			const { userId } = this.getParamsFromUrl(req.url)
			if (this.clients.has(userId)) return

			this.clients.set(userId, client.send.bind(client))

			this.send(userId, Result.ok(new WsResponse(WsEvents.WELCOME)))

			client.on('close', () => {
				if (this.clients.has(userId)) this.clients.delete(userId)
			})
		} catch (e) {}
	}

	public async send(userId: string, message: Result<UseCaseError | WsResponse>) {
		try {
			if (!this.clients.has(userId)) return
			this.clients.get(userId)?.(JSON.stringify(message))
		} catch (e) {}
	}

	private getParamsFromUrl(url: string): Params {
		const params = {
			userId: null,
		}
		new URL(`http://t/${url}`).searchParams.forEach((value, name) => {
			params[name] = value
		})
		return params
	}
}
