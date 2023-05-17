import { Result, UseCaseError } from '../../../../shared'

export namespace GetChapterError {
	export class ChapterQueryError extends Result<UseCaseError> {
		constructor() {
			super(false, 'get chapter receiving error')
		}
	}
}
