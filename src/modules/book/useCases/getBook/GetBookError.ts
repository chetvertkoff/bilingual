import { Result } from '../../../../shared/helpers/Result'
import { UseCaseError } from '../../../../shared/helpers/UseCaseError'

export namespace GetBilingualError {
	export class BookQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get bilingual receiving error')
		}
	}
}
