import { Result } from '../helpers/Result'
import { UseCaseError } from '../helpers/UseCaseError'

export namespace AppError {
	export class UnknownError extends Result<UseCaseError> {
		constructor(message = 'unknown error') {
			super(false, message)
		}
	}
}
