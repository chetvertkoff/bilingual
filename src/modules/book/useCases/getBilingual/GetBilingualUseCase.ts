import { UseCase } from '../../../../core/domain/UseCase'
import { IBookRepo } from '../../repos/BookRepo'
import { GetBilingualError } from './GetBilingualError'
import { Book } from '../../../../infra/db/entity/Book'

interface Props {
	id: string
	userId: string
}
export class GetBilingualUseCase implements UseCase<Props, Promise<Book | GetBilingualError.BookQueryError>> {
	constructor(private bookRepo: IBookRepo) {}

	public async execute({ id, userId }: Props) {
		const itemResult = await this.bookRepo.getBilingualItem(id, userId)
		if (!itemResult.success) return new GetBilingualError.BookQueryError()
		return itemResult.value as Book
	}
}
