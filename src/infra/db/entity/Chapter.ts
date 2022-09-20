import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './Book'
import { ChapterFull } from './ChapterFull'

@Entity()
export class Chapter {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToOne(() => Book, (book) => book.chapters)
	book: Book

	@OneToMany(() => ChapterFull, (chapterFull) => chapterFull.chapter)
	chaptersFull: ChapterFull[]
}
