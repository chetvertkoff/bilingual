import { BaseParams } from '../../../shared/infra/BaseParams'

export interface GetParagraphParams extends BaseParams {
	chapter_id?: number
	book_id?: number
	id_more_than?: string
	id_more_than_or_equal?: string
	id_less_than?: string
	id_less_than_or_equal?: string
}
