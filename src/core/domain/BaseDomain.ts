import { BaseDomainProps } from './BaseDomainProps'

export class BaseDomain<T extends BaseDomainProps> {
	public id: number

	public createdDate: Date

	constructor(protected props: T) {
		this.id = props.id
		this.createdDate = props.createdDate
	}
}
