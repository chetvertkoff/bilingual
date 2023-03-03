import { BaseDomain } from '../../../core/domain/BaseDomain'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'
import { ParagraphDomain } from './ParagraphDomain'

interface Props extends BaseDomainProps {
	name: string
	paragraphs?: ParagraphDomain[]
}

export class ChapterDomain extends BaseDomain<Props> {
	name: string

	paragraphs: ParagraphDomain[]

	constructor(props: Props) {
		super(props)
		this.name = props.name
		this.paragraphs = props.paragraphs ?? []
	}

	public static create(props: Props) {
		return new ChapterDomain(props)
	}
}
