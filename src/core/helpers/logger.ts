import { access, appendFile, writeFile } from 'fs/promises'
import fs from 'fs'

const defaultPath = 'C:\\projects\\bilingual\\static\\log.txt'

export const logger = async (data: unknown, path = defaultPath): Promise<void> => {
	const write = () => writeFile(path, typeof data === 'string' ? data : JSON.stringify(data))

	fs.access(path, fs.constants.F_OK, async (err) => {
		if (err) {
			await appendFile(path, '')
			return write()
		}

		await writeFile(path, '')
		await write()
	})
}
