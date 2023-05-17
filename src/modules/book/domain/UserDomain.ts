import { BaseDomain } from '../../../shared'
import { BaseDomainProps } from '../../../shared/domain/BaseDomainProps'

interface Props extends BaseDomainProps {
	firstName: string
	lastName: string
	email: string
}

export class UserDomain extends BaseDomain<Props> {
	firstName: string

	lastName: string

	email: string

	constructor(props: Props) {
		super(props)
		this.lastName = props.lastName
		this.firstName = props.firstName
		this.email = props.email
	}

	public static create(props: Props): UserDomain {
		return new UserDomain(props)
	}
}
