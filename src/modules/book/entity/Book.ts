import { Entity } from '../../../core/domain/Entity'

interface BookProps {
	chapters: Chapter[]
}

export class Book extends Entity<BookProps> {
	get chapters(): Chapter[] {
		return this.props.chapters
	}

	private constructor(props: BookProps) {
		super(props)
	}

	public static create(props: BookProps) {
		return new Book(props)
	}
}
