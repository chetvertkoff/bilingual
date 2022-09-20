import { DataSource } from 'typeorm'
import { entities } from './entity/entities'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'test',
	database: 'bilingual',
	synchronize: true,
	logging: false,
	entities,
	migrations: [],
	subscribers: [],

	// @ts-ignore
	seeds: ['src/infra/db/seeding/seeds/**/*{.ts,.js}'],
	factories: ['src/infra/db/seeding/factories/**/*{.ts,.js}'],
})

// module.exports = AppDataSource
