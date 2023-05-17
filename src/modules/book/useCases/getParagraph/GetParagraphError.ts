import { Result, UseCaseError } from '../../../../shared'

export namespace GetParagraphError {
	export class ParagraphQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get paragraph receiving error')
		}
	}
}
