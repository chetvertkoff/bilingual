import { BaseDomain } from '../../../core'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'

interface BookProps extends BaseDomainProps {
	progress: number
}

export class BookDomain extends BaseDomain<BookProps> {
	public progress: number

	private constructor(props: BookProps) {
		super(props)
		this.progress = props.progress
	}

	public static create(props: BookProps) {
		return new BookDomain(props)
	}
}
