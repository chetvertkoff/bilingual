// @ts-nocheck
import { readFile } from 'fs/promises'
import path from 'path'
import { TranslateService } from './modules/book/services/TranslateService'
import { logger } from '../logger'
;(async () => {
	const logPath = path.join('C:\\projects\\bilingual\\log\\test.json')
	const book = await readFile(logPath)
	const translated = await new TranslateService().execute(JSON.parse(book))
	await logger(translated, 'test2.json')
	console.log(translated)
})()
