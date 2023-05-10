import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Chapter } from './Chapter'
import { Users } from './Users'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Book extends BaseEntity {
	@ManyToOne(() => Users, (user) => user.books)
	user: Users

	@Column({
		nullable: true,
	})
	progress: number

	@Column({
		nullable: true,
	})
	cover: string

	@OneToMany(() => Chapter, (chapter) => chapter.book)
	chapters: Chapter[]
}
