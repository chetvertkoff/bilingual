import { Entity } from '../../../core/domain/Entity'

interface Props {
	originalText: string
	translate: string
	tagName: string
}

export class ChapterFull extends Entity<Props> {
	get translate(): string {
		return this.props.translate
	}

	get tagName(): string {
		return this.props.tagName
	}

	get originalText(): string {
		return this.props.originalText
	}
	constructor(props: Props) {
		super(props)
	}
	public static create(props: Props) {
		return new ChapterFull(props)
	}
}
