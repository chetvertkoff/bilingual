import { BaseResponseCatalog } from '../../../../shared/infra/BaseResponseCatalog'
import { ParagraphDomain } from '../../domain'

export class GetParagraphResponse extends BaseResponseCatalog<ParagraphDomain> {
	public first: ParagraphDomain

	public last: ParagraphDomain

	constructor(entries: ParagraphDomain[], total: number, first?: ParagraphDomain, last?: ParagraphDomain) {
		super(entries, total)
		this.first = first
		this.last = last
	}
}
