import { EntityManager } from 'typeorm'
import { Result } from '../../../shared'
import { Users } from '../../../infra'
import { UserDomain } from '../domain'
import { UserMap } from '../mappers'

export interface IUserRepo {
	getUserByIdQuery(userId: number): Promise<Result<UserDomain>>
}

export class UserRepo implements IUserRepo {
	constructor(private db: EntityManager) {}

	private get repo() {
		return this.db.connection.manager.getRepository(Users)
	}

	public async getUserByIdQuery(userId: number): Promise<Result<UserDomain>> {
		try {
			const item = await this.repo.findOne({
				where: { id: userId },
			})

			return Result.ok<UserDomain>(UserMap.toDomain(item))
		} catch (e) {
			return Result.fail<UserDomain>(e)
		}
	}
}
