import { BaseDomain } from '../../../core/domain/BaseDomain'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'

interface Props extends BaseDomainProps {
	originalText: string
	translate: string
	tagName: string
}

export class ParagraphDomain extends BaseDomain<Props> {
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
		return new ParagraphDomain(props)
	}
}
