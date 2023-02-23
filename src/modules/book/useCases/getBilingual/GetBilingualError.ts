import { Result } from '../../../../core/helpers/Result'
import { UseCaseError } from '../../../../core/helpers/UseCaseError'

export namespace GetBilingualError {
	export class BookQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get bilingual receiving error')
		}
	}
}
