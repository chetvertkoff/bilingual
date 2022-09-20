import { Server, WebSocket } from 'ws'
import { IncomingMessage } from 'http'

export class Notifyer {
	private ws: Server
	private clients = new Map<string, WebSocket['send']>()

	public init(ws: Server) {
		this.ws = ws
	}

	public addClient(client: WebSocket, req: IncomingMessage) {
		try {
			const userId = new URL(`http://t/${req.url}`).searchParams.get('userId')
			if (!this.clients.has(userId)) this.clients.set(userId, client.send.bind(client))

			client.on('close', () => {
				if (this.clients.has(userId)) this.clients.delete(userId)
			})
		} catch (e) {
			client.close()
		}
	}

	public async send(userId: string, message: any) {
		this.clients.get(userId)?.(JSON.stringify(message))
	}
}
