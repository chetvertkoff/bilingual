import { WsEvents } from '../constants'

export class WsResponse {
	constructor(public event: WsEvents, public data?: unknown) {}
}
