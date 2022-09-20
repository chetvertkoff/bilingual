import { Faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Users } from '../../entity/Users'

define(Users, (faker: Faker) => {
	const user = new Users()
	user.firstName = faker.name.firstName()
	user.lastName = faker.name.lastName()
	user.email = faker.internet.email()
	return user
})
