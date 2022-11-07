import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Book } from './Book'
import { ChapterFull } from './ChapterFull'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Chapter extends BaseEntity {
	@Column()
	name: string

	@ManyToOne(() => Book, (book) => book.chapters)
	book: Book

	@OneToMany(() => ChapterFull, (chapterFull) => chapterFull.chapter)
	chaptersFull: ChapterFull[]
}
