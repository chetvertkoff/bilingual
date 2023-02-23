import { Result, UseCaseError } from '../../../../core'

export namespace GetChapterError {
	export class ChapterQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get chapter receiving error')
		}
	}
}
