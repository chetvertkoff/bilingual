import { Faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Paragraph } from '../../entity/Paragraph'

define(Paragraph, (faker: Faker) => {
	const paragraph = new Paragraph()
	paragraph.originalText = faker.lorem.paragraph()
	paragraph.translate = faker.lorem.paragraph()
	paragraph.tagName = 'p'

	return paragraph
})
