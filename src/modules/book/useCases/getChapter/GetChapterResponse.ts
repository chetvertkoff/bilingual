import { BaseResponseCatalog } from '../../../../core/infra/BaseResponseCatalog'
import { Chapter } from '../../../../infra/db/entity/Chapter'

export class GetChapterResponse extends BaseResponseCatalog<Chapter> {
	public first: Chapter

	public last: Chapter

	constructor(entries: Chapter[], total: number, first?: Chapter, last?: Chapter) {
		super(entries, total)
		this.first = first
		this.last = last
	}
}
