import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Book } from './Book'

@Entity()
export class Users {
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
