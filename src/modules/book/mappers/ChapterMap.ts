import { Chapter } from '../../../infra/db/entity/Chapter'
import { ChapterDomain } from '../domain'
import { ParagraphMap } from './ParagraphMap'

export class ChapterMap {
	public static toDb(chapterDomain: ChapterDomain): Chapter {
		const chapter = new Chapter()

		chapter.id = chapterDomain.id
		chapter.createdDate = chapterDomain.createdDate
		chapter.name = chapterDomain.name

		return chapter
	}

	public static toDomain(raw: Chapter): ChapterDomain {
		return ChapterDomain.create({ ...raw, paragraphs: raw.paragraphs?.map((item) => ParagraphMap.toDomain(item)) })
	}
}
