import { Faker } from '@faker-js/faker'
import { define, factory } from 'typeorm-seeding'
import { Chapter } from '../../entity/Chapter'
import { Book } from '../../entity/Book'

define(Chapter, (faker: Faker) => {
	const chapter = new Chapter()
	chapter.name = faker.name.firstName()
	return chapter
})
