import { Paragraph } from '../../../../infra/db/entity/Paragraph'
import { BaseResponseCatalog } from '../../../../core/infra/BaseResponseCatalog'

export class GetParagraphResponse extends BaseResponseCatalog<Paragraph> {
	public first: Paragraph

	public last: Paragraph

	constructor(entries: Paragraph[], total: number, first?: Paragraph, last?: Paragraph) {
		super(entries, total)
		this.first = first
		this.last = last
	}
}
