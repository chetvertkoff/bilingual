import { Result } from '../../../../core/helpers/Result'
import { UseCaseError } from '../../../../core/helpers/UseCaseError'

export namespace CreateBilingualError {
	export class BookParseError extends Result<UseCaseError> {
		constructor() {
			super(false, 'Book parsed error')
		}
	}
	export class BookTranslateError extends Result<UseCaseError> {
		constructor() {
			super(false, 'Translate book error')
		}
	}
	export class BookSaveError extends Result<UseCaseError> {
		constructor() {
			super(false, 'Save book error')
		}
	}
}
