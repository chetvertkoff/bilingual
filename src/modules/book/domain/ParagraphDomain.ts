import { BaseDomain } from '../../../shared/domain/BaseDomain'
import { BaseDomainProps } from '../../../shared/domain/BaseDomainProps'

interface Props extends BaseDomainProps {
	originalText: string
	translate: string
	tagName: string
}

export class ParagraphDomain extends BaseDomain<Props> {
	translate: string

	tagName: string

	originalText: string

	constructor(props: Props) {
		super(props)
		this.translate = props.translate
		this.tagName = props.tagName
		this.originalText = props.originalText
	}
	public static create(props: Props) {
		return new ParagraphDomain(props)
	}
}
