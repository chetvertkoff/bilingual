import { WebSocket } from 'ws'
import { IncomingMessage } from 'http'
import { Callback } from '../../core'

type Params = Record<string, string> & {
	userId: string
}

export class Notifyer {
	private clients = new Map<string, Callback>()

	public addClient(client: WebSocket, req: IncomingMessage) {
		try {
			const { userId } = this.getParamsFromUrl(req.url)
			if (this.clients.has(userId)) return

			this.clients.set(userId, client.send.bind(client))

			client.on('close', () => {
				if (this.clients.has(userId)) this.clients.delete(userId)
			})
		} catch (e) {}
	}

	public async send(userId: string, message: any) {
		try {
			if (this.clients.has(userId)) return
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
