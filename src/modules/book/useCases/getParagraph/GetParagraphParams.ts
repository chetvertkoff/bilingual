import { BaseParams, BaseParamsProps } from '../../../../core/infra/BaseParams'

export interface GetParagraphParamsProps extends BaseParamsProps {
	chapter_id?: string
	book_id?: string
	id_more_than?: string
	id_more_than_or_equal?: string
	id_less_than?: string
	id_less_than_or_equal?: string
}

export class GetParagraphParams extends BaseParams {
	chapter_id?: string
	book_id?: string
	id_more_than?: string
	id_more_than_or_equal?: string
	id_less_than?: string
	id_less_than_or_equal?: string

	constructor(props: GetParagraphParamsProps) {
		super(props)
		this.chapter_id = props.chapter_id
		this.book_id = props.book_id
		this.id_more_than = props.id_more_than
		this.id_more_than_or_equal = props.id_more_than_or_equal
		this.id_less_than = props.id_less_than
		this.id_less_than_or_equal = props.id_less_than_or_equal
	}
}
