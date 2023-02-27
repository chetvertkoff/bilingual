import WebSocket from 'ws'
import { Notifier } from './Notifier'

export const notify = new Notifier()

export const runWS = async () => {
	const wsServer = new WebSocket.Server({ port: 27800 })

	wsServer.on('connection', (wsClient, req) => {
		notify.addClient(wsClient, req)
	})

	console.log('Websocket is running')
}
