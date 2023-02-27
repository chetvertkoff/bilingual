import { BaseDomain } from '../../../core'
import { BaseDomainProps } from '../../../core/domain/BaseDomainProps'

interface BookProps extends BaseDomainProps {
	loading: boolean
}

export class BookDomain extends BaseDomain<BookProps> {
	get loading() {
		return this.props.loading
	}

	private constructor(props: BookProps) {
		super(props)
	}

	public static create(props: BookProps) {
		return new BookDomain(props)
	}
}
