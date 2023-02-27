import { BaseDomain } from '../../../core/domain/BaseDomain'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'
import { ParagraphDomain } from './ParagraphDomain'

interface Props extends BaseDomainProps {
	name: string
	paragraphs?: ParagraphDomain[]
}

export class ChapterDomain extends BaseDomain<Props> {
	get name() {
		return this.props.name
	}

	get paragraphs() {
		return this.props.paragraphs ?? []
	}

	constructor(props: Props) {
		super(props)
	}

	public static create(props: Props) {
		return new ChapterDomain(props)
	}
}
