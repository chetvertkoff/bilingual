export * from './Result'
export * from './UseCaseError'

export const isEmpty = (val): boolean =>
	val === undefined ||
	val === null ||
	(Array.isArray(val) && !val?.length) ||
	(val?.constructor === Object && !Object.keys(val)?.length)
