import { Result, UseCaseError } from '../../../../core'

export namespace GetParagraphError {
	export class ParagraphQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get paragraph receiving error')
		}
	}
}
