import { Callback } from '../types'

export interface IObserver {
	subscribe(eventId: string, callback: Callback)
	unsubscribe(eventId: string)
	dispatch(eventId: string, payload: Record<string, any>)
}

class Observer {
	subscribers: Map<string, Callback> = new Map()

	public subscribe(eventId: string, callback: Callback) {
		if (!this.subscribers.has(eventId)) this.subscribers.set(eventId, callback)

		return () => {
			this.unsubscribe(eventId)
		}
	}

	public unsubscribe(eventId: string) {
		this.subscribers.delete(eventId)
	}

	public dispatch(eventId: string, payload: Record<string, any>) {
		this.subscribers.get(eventId)?.(payload)
	}
}

export const observer = new Observer()
