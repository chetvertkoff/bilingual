import { UserDomain } from '../domain'
import { Users } from '../../../infra'

export class UserMap {
	public static toDb(userDomain: UserDomain): Users {
		const user = new Users()

		user.id = userDomain.id
		user.createdDate = userDomain.createdDate
		user.firstName = userDomain.firstName
		user.lastName = userDomain.lastName
		return user
	}

	public static toDomain(raw: Users): UserDomain {
		return UserDomain.create(raw)
	}
}
