import { isEmpty } from './index'

export class Result<T = unknown> {
	public success: boolean
	public error?: string
	public value?: T
	public errorCode?: number

	constructor(success: boolean, error?: string, value?: T, errorCode?: number) {
		this.success = success
		if (!isEmpty(error)) this.error = error
		if (!isEmpty(value)) this.value = value
		if (!isEmpty(errorCode)) this.errorCode = errorCode
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value)
	}

	public static fail<U = Error>(error?: Error, errorCode = 500): Result<U> {
		console.log(error)
		return new Result<U>(false, error.message, undefined, errorCode)
	}
}
