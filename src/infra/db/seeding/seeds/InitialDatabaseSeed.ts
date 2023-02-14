import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Book } from '../../entity/Book'
import { Chapter } from '../../entity/Chapter'
import { Paragraph } from '../../entity/Paragraph'
import { Users } from '../../entity/Users'

export default class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const users = await factory(Users)().createMany(2)

		const book = await factory(Book)()
			.map(async (book) => {
				book.user = users[Math.floor(Math.random() * users.length)]
				return book
			})
			.createMany(4)

		const chapter = await factory(Chapter)()
			.map(async (chapter) => {
				chapter.book = book[Math.floor(Math.random() * book.length)]
				return chapter
			})
			.createMany(20)

		await factory(Paragraph)()
			.map(async (paragraph) => {
				paragraph.chapter = chapter[Math.floor(Math.random() * chapter.length)]
				return paragraph
			})
			.createMany(50)
	}
}
