import { WebSocket } from 'ws'
import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'

interface WebSocketExtended extends WebSocket {
	connectionId: string
}

type Params = Record<string, string> & {
	userId: string
}

interface ConnectionData {
	params: Params
	send: WebSocketExtended['send']
}

export class Notifyer {
	private clients = new Map<string, ConnectionData>()

	public addClient(client: WebSocketExtended, req: IncomingMessage) {
		try {
			client.connectionId = uuidv4()
			const { connectionId } = client
			if (this.clients.has(connectionId)) return

			this.clients.set(connectionId, { params: this.getParamsFromUrl(req.url), send: client.send.bind(client) })

			client.on('close', () => {
				if (this.clients.has(connectionId)) this.clients.delete(connectionId)
			})
		} catch (e) {}
	}

	public async send(userId: string, message: any) {
		console.log(userId, this.clients)
		this.clients.forEach((val) => {
			if (val?.params.userId === userId) {
				val?.send(JSON.stringify(message))
			}
		})
	}

	private getParamsFromUrl(url: string): ConnectionData['params'] {
		// TODO сделать с итератором
		const params = {
			userId: null,
		}
		new URL(`http://t/${url}`).searchParams.forEach((value, name) => {
			params[name] = value
		})
		return params
	}
}
