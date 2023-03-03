import { UseCase } from '../../../../core/domain/UseCase'
import { IBookRepo } from '../../repos/BookRepo'
import { GetBilingualItemsError } from './GetBookItemsError'
import { Result } from '../../../../core'
import { BookDomain } from '../../domain'
import { BaseResponseCatalog } from '../../../../core/infra'

interface Props {
	userId: string
}
export class GetBookItemsUseCase
	implements UseCase<Props, Promise<Result<BaseResponseCatalog<BookDomain>> | GetBilingualItemsError.BookQueryError>>
{
	constructor(private bookRepo: IBookRepo) {}

	public async execute({ userId }: Props) {
		const [itemResult, itemCountResult] = await Promise.all([
			this.bookRepo.getBookItemsByUserIdQuery(userId),
			this.bookRepo.getBookItemCountByUserIdQuery(userId),
		])

		if (!itemResult.success || !itemCountResult.success) return new GetBilingualItemsError.BookQueryError()
		return Result.ok(new BaseResponseCatalog(itemResult.value, itemCountResult.value))
	}
}
