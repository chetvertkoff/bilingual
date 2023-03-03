import { BaseDomain } from '../../../core'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'

interface BookProps extends BaseDomainProps {
	loading: boolean
}

export class BookDomain extends BaseDomain<BookProps> {
	public loading: boolean

	private constructor(props: BookProps) {
		super(props)
		this.loading = props.loading
	}

	public static create(props: BookProps) {
		return new BookDomain(props)
	}
}
