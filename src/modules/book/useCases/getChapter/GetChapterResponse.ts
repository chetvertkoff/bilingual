import { BaseResponseCatalog } from '../../../../shared/infra/BaseResponseCatalog'
import { ChapterDomain } from '../../domain'

export class GetChapterResponse extends BaseResponseCatalog<ChapterDomain> {
	public first: ChapterDomain

	public last: ChapterDomain

	constructor(entries: ChapterDomain[], total: number, first?: ChapterDomain, last?: ChapterDomain) {
		super(entries, total)
		this.first = first
		this.last = last
	}
}
