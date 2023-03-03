export class BaseResponseCatalog<T = unknown> {
	public entries: T[]

	public total: number

	constructor(entries: T[], total: number) {
		this.entries = entries
		this.total = total
	}
}
