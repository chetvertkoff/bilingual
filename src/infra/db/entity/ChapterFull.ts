import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Chapter } from './Chapter'

@Entity()
export class ChapterFull {
	@PrimaryGeneratedColumn()
	id: number

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

	@ManyToOne(() => Chapter, (chapter) => chapter.chaptersFull)
	chapter: Chapter
}
