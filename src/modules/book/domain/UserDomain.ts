import { BaseDomain } from '../../../core'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'

interface Props extends BaseDomainProps {
	firstName: string
	lastName: string
	email: string
}

export class UserDomain extends BaseDomain<Props> {
	public get firstName() {
		return this.props.firstName
	}

	public get lastName() {
		return this.props.lastName
	}

	public get email() {
		return this.props.email
	}

	constructor(props: Props) {
		super(props)
	}

	public static create(props: Props): UserDomain {
		return new UserDomain(props)
	}
}
