import 'reflect-metadata'
import config from '../../../ormconfig'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource(config)

export const runDB = async () => {
	try {
		await AppDataSource.initialize()
		console.log('db is run')
	} catch (e) {
		console.log(e)
	}
}

export const db = AppDataSource.manager
