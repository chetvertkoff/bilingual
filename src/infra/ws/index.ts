// @ts-nocheck
import WebSocket from 'ws'
import { Notifyer } from './Notifyer'

export const notify = new Notifyer()

export const runWS = async () => {
	const wsServer = new WebSocket.Server({ port: 27800 })

	wsServer.on('connection', (wsClient, req) => {
		notify.addClient(wsClient, req)
	})

	console.log('Websocket is running')
}
