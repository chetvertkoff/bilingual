import { UseCase } from '../../../../shared/domain/UseCase'
import { IBookRepo } from '../../repos/BookRepo'
import { GetBilingualItemsError } from './GetBookItemsError'
import { Result } from '../../../../shared'
import { BookDomain } from '../../domain'
import { BaseParams, BaseResponseCatalog } from '../../../../shared/infra'

interface Props {
	userId: string
	params: BaseParams
}
export class GetBookItemsUseCase
	implements UseCase<Props, Promise<Result<BaseResponseCatalog<BookDomain>> | GetBilingualItemsError.BookQueryError>>
{
	constructor(private bookRepo: IBookRepo) {}

	public async execute({ userId, params }: Props) {
		const [itemResult, itemCountResult] = await Promise.all([
			this.bookRepo.getBookItemsByUserIdQuery(userId, new BaseParams(params)),
			this.bookRepo.getBookItemCountByUserIdQuery(userId),
		])

		if (!itemResult.success || !itemCountResult.success) return new GetBilingualItemsError.BookQueryError()
		return Result.ok(new BaseResponseCatalog(itemResult.value, itemCountResult.value))
	}
}
