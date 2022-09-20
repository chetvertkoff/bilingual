import { Faker } from '@faker-js/faker'
import { define, factory } from 'typeorm-seeding'
import { ChapterFull } from '../../entity/ChapterFull'
import { Chapter } from '../../entity/Chapter'

define(ChapterFull, (faker: Faker) => {
	const chapterFull = new ChapterFull()
	chapterFull.originalText = faker.lorem.paragraph()
	chapterFull.translate = faker.lorem.paragraph()
	chapterFull.tagName = 'p'
	chapterFull.chapter = factory(Chapter)() as any

	return chapterFull
})
