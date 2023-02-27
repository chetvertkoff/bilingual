import { EntityManager, QueryRunner } from 'typeorm'

export interface IBaseRepo {
	startTransaction(): Promise<void>
	commitTransaction(): Promise<void>
	rollBackTransaction(): Promise<void>
}

export class BaseRepo implements IBaseRepo {
	private queryRunner: QueryRunner

	constructor(protected db: EntityManager) {}

	public async startTransaction(): Promise<void> {
		this.queryRunner = this.db.connection.createQueryRunner()
		await this.queryRunner.connect()
		await this.queryRunner.startTransaction()
	}

	public async commitTransaction(): Promise<void> {
		await this.queryRunner.commitTransaction()
		await this.queryRunner.release()
	}

	public async rollBackTransaction(): Promise<void> {
		await this.queryRunner.rollbackTransaction()
		await this.queryRunner.release()
	}
}
