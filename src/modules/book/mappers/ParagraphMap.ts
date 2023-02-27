import { ParagraphDomain } from '../domain'
import { Paragraph } from '../../../infra'

export class ParagraphMap {
	public static toDb(paragraphDomain: ParagraphDomain): Paragraph {
		const paragraph = new Paragraph()

		paragraph.id = paragraphDomain.id
		paragraph.createdDate = paragraphDomain.createdDate
		paragraph.originalText = paragraphDomain.originalText
		paragraph.translate = paragraphDomain.translate
		paragraph.tagName = paragraphDomain.tagName

		return paragraph
	}

	public static toDomain(raw: Paragraph): ParagraphDomain {
		return ParagraphDomain.create(raw)
	}
}
