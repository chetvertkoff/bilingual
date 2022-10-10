import { Faker } from '@faker-js/faker'
import { define, factory } from 'typeorm-seeding'
import { Book } from '../../entity/Book'
import { Users } from '../../entity/Users'

define(Book, (faker: Faker) => {
	const book = new Book()
	return book
})
