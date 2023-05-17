import { Result } from '../../../../shared/helpers/Result'
import { UseCaseError } from '../../../../shared/helpers/UseCaseError'

export namespace GetBilingualItemsError {
	export class BookQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'Bilingual items receiving error')
		}
	}
}
