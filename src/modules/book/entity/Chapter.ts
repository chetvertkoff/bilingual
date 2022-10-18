import { Entity } from '../../../core/domain/Entity'

interface Props {
	name: string
}

export class Chapter extends Entity<Props> {
	get name(): string {
		return this.props.name
	}

	constructor(props: Props) {
		super(props)
	}

	public static create(props: Props) {
		return new Chapter(props)
	}
}
