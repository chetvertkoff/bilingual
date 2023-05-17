import { WebSocket } from 'ws'
import { IncomingMessage } from 'http'
import { Callback, Result, UseCaseError } from '../../shared'
import { WsResponse } from '../../shared/infra'
import { WsEvents } from '../../shared/constants'

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
				console.log('close')
				if (this.clients.has(userId)) this.clients.delete(userId)
			})

			client.on('message', (data) => {
				const message = data.toString()
				if (message === 'pong') {
					this.send(userId, Result.ok(new WsResponse(WsEvents.PING, String(Math.random()))))
				}
			})
		} catch (e) {
			console.log('addClient', e)
		}
	}

	public async send(userId: string, message: Result<UseCaseError | WsResponse>) {
		try {
			if (!this.clients.has(userId)) return
			setTimeout(() => {
				this.clients.get(userId)?.(JSON.stringify(message))
			}, 0)
		} catch (e) {
			console.log('send', e)
		}
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
