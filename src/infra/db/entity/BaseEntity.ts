import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn()
	createdDate: Date
}
