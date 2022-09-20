import WebSocket from 'ws'
import { Notifyer } from './Notifyer'

export const notify = new Notifyer()

export const runWS = async () => {
	const wsServer = new WebSocket.Server({ port: 27800 })
	notify.init(wsServer)

	wsServer.on('connection', function onConnect(wsClient, req) {
		// console.log('Новый пользователь')
		notify.addClient(wsClient, req)

		// wsClient.on('message', async function message(data: BinaryData) {
		// 	const book = JSON.parse(data.toString())
		// 	return wsClient.send('')
		// })

		// wsClient.on('close', function () {
		// 	console.log('Пользователь отключился')
		// })
	})

	console.log('Websocket is running')
}
