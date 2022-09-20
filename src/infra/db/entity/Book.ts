import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Chapter } from './Chapter'
import { Users } from './Users'

@Entity()
export class Book {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Users, (user) => user.books)
	user: Users

	@OneToMany(() => Chapter, (chapter) => chapter.book)
	chapters: Chapter[]
}
