import 'reflect-metadata'
import { entities } from './src/infra/db/entity/entities'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'

export default {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'test',
	database: 'bilingual',
	synchronize: true,
	logging: false,
	entities,
	migrations: ['migrations/**/*{.ts,.js}'],
	subscribers: [],

	// @ts-ignore
	seeds: ['src/infra/db/seeding/seeds/**/*{.ts,.js}'],
	factories: ['src/infra/db/seeding/factories/**/*{.ts,.js}'],
} as DataSourceOptions
