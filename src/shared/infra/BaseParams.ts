import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm'

export interface BaseParamsProps {
	id?: string
	skip?: string
	take?: string
	order?: 'ASC' | 'DESC'
}

const findOperators = {
	_more_than: MoreThan,
	_more_than_or_equal: MoreThanOrEqual,
	_less_than: LessThan,
	_less_than_or_equal: LessThanOrEqual,
}

export class BaseParams {
	public readonly id?: string
	public readonly skip?: string
	public readonly take?: string
	public readonly order?: 'ASC' | 'DESC'

	constructor(props: BaseParamsProps = {}) {
		if (props?.id) this.id = props.id
		this.skip = props.skip ?? '0'
		this.take = props.take ?? '30'
		this.order = props.order ?? 'ASC'
	}

	public getFindOperatorByKey<T>(key: string): T {
		const paramKey = Object.keys(findOperators).find((item) => this[`${key}${item}`])
		return findOperators[paramKey]?.(this[`${key}${paramKey}`])
	}
}
