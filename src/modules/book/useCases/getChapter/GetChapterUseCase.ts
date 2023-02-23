import { UseCase } from '../../../../core/domain/UseCase'
import { GetChapterParams } from './GetChapterParams'
import { IChapterRepo } from '../../repos/ChapterRepo'
import { GetChapterError } from './GetChapterError'

interface Props {
	userId: string
	params: GetChapterParams
}
export class GetChapterUseCase implements UseCase<Props, any> {
	constructor(private chapterRepo: IChapterRepo) {}

	async execute({ userId, params }: Props) {
		const res = await this.chapterRepo.getChapter(userId, params)
		if (!res.success) return new GetChapterError.ChapterQueryError()
		return res
	}
}
