import { AppDataSource } from './data-source'

export const runDB = async () => {
	try {
		await AppDataSource.initialize()
		console.log('db is run')
	} catch (e) {
		console.log(e)
	}
}

export const db = AppDataSource.manager
