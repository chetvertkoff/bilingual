import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Book } from './Book'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@OneToMany(() => Book, (book) => book.user)
	books: Book[]
}
