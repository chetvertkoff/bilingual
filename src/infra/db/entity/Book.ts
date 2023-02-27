import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Chapter } from './Chapter'
import { Users } from './Users'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Book extends BaseEntity {
	@ManyToOne(() => Users, (user) => user.books)
	@JoinColumn()
	user: Users

	@Column({
		nullable: true,
	})
	loading: boolean

	@OneToMany(() => Chapter, (chapter) => chapter.book)
	@JoinColumn()
	chapters: Chapter[]
}
