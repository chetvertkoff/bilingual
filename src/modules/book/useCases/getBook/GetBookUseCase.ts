import { UseCase } from '../../../../shared/domain/UseCase'
import { IBookRepo } from '../../repos/BookRepo'
import { GetBilingualError } from './GetBookError'
import { Result } from '../../../../shared'
import { BookDomain } from '../../domain'

interface Props {
	userId: number
	id: string
}
export class GetBookUseCase implements UseCase<Props, Promise<GetBilingualError.BookQueryError | Result<BookDomain>>> {
	constructor(private bookRepo: IBookRepo) {}

	public async execute({ id, userId }: Props) {
		const itemResult = await this.bookRepo.getBookByIdQuery(+id, +userId)
		if (!itemResult.success) return new GetBilingualError.BookQueryError()
		return itemResult
	}
}
