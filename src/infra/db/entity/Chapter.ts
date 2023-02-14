import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Book } from './Book'
import { Paragraph } from './Paragraph'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Chapter extends BaseEntity {
	@Column()
	name: string

	@ManyToOne(() => Book, (book) => book.chapters)
	book: Book

	@OneToMany(() => Paragraph, (paragraph) => paragraph.chapter)
	paragraphs: Paragraph[]
}
