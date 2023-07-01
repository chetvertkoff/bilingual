export interface IFactory<T, Args extends unknown[] = unknown[]> {
	create(...args: Args): T
}
