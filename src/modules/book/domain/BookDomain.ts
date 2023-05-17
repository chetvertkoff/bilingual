import { BaseDomain } from '../../../shared'
import { BaseDomainProps } from '../../../shared/domain/BaseDomainProps'

interface BookProps extends BaseDomainProps {
	progress?: number
	cover?: string
}

export class BookDomain extends BaseDomain<BookProps> {
	public progress: number
	public cover: string

	private constructor(props: BookProps) {
		super(props)
		this.progress = props.progress ?? null
		this.cover = props.cover ?? null
	}

	public static create(props: BookProps) {
		return new BookDomain(props)
	}
}
