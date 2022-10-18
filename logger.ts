import { appendFile, writeFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'

export const logger = async (data: unknown, name = 'test.json'): Promise<void> => {
	const logPath = path.join(__dirname, `/log/${name}`)
	const write = () => writeFile(logPath, typeof data === 'string' ? data : JSON.stringify(data))

	fs.access(logPath, fs.constants.F_OK, async (err) => {
		if (err) {
			await appendFile(logPath, '')
			return write()
		}

		await writeFile(logPath, '')
		await write()
	})
}
