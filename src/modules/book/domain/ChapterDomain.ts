import { BaseDomain } from '../../../shared/domain/BaseDomain'
import { BaseDomainProps } from '../../../shared/domain/BaseDomainProps'
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
