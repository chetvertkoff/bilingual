import { Column, Entity, ManyToOne } from 'typeorm'
import { Chapter } from './Chapter'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Paragraph extends BaseEntity {
	@Column()
	originalText: string

	@Column()
	translate: string

	@Column()
	tagName: string

	@Column({
		nullable: true,
	})
	translateDict: string

	@ManyToOne(() => Chapter, (chapter) => chapter.paragraphs)
	chapter: Chapter
}
