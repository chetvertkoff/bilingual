import { UseCase } from '../../../../core/domain/UseCase'
import { IBookRepo } from '../../repos/BookRepo'
import { Book } from '../../../../infra/db/entity/Book'
import { GetBilingualItemsError } from './GetBilingualItemsError'

interface Props {
	userId: string
}
export class GetBilingualItemsUseCase
	implements UseCase<Props, Promise<Book[] | GetBilingualItemsError.BookQueryError>>
{
	constructor(private bookRepo: IBookRepo) {}

	public async execute({ userId }: Props) {
		const itemResult = await this.bookRepo.getBilingualItems(userId)
		if (!itemResult.success) return new GetBilingualItemsError.BookQueryError()
		return itemResult.value as Book[]
	}
}
