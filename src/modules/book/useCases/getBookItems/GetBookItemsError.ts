import { Result } from '../../../../core/helpers/Result'
import { UseCaseError } from '../../../../core/helpers/UseCaseError'

export namespace GetBilingualItemsError {
	export class BookQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'Bilingual items receiving error')
		}
	}
}
