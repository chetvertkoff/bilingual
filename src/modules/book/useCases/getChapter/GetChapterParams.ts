import { BaseParams, BaseParamsProps } from '../../../../shared/infra/BaseParams'

export interface GetChapterParamsProps extends BaseParamsProps {
	book_id?: string
	id_more_than?: string
	id_more_than_or_equal?: string
	id_less_than?: string
	id_less_than_or_equal?: string
}

export class GetChapterParams extends BaseParams {
	book_id?: string
	id_more_than?: string
	id_more_than_or_equal?: string
	id_less_than?: string
	id_less_than_or_equal?: string

	constructor(props: GetChapterParamsProps) {
		super(props)
		this.book_id = props.book_id
		this.id_more_than = props.id_more_than
		this.id_more_than_or_equal = props.id_more_than_or_equal
		this.id_less_than = props.id_less_than
		this.id_less_than_or_equal = props.id_less_than_or_equal
	}
}
