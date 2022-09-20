import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Book } from '../../entity/Book'
import { Chapter } from '../../entity/Chapter'
import { ChapterFull } from '../../entity/ChapterFull'

export default class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		await factory(Book)().create()
		await factory(Chapter)().createMany(2)
		await factory(ChapterFull)().createMany(2)
	}
}
