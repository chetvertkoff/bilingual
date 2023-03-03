import { Entity, Column, OneToMany } from 'typeorm'
import { Book } from './Book'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Users extends BaseEntity {
	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@OneToMany(() => Book, (book) => book.user)
	books: Book[]
}
