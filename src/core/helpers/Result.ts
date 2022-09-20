export class Result<T> {
	constructor(public success: boolean, public error?: string, public value?: T) {}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value)
	}

	public static fail<U>(error: Error): Result<U> {
		console.log(error)
		return new Result<U>(false, error.message)
	}
}
