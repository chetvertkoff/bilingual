import express from 'express'
import { createBilingualController } from '../../useCases/createBilingual'
import { getBookController } from '../../useCases/getBook'
import { getBookItemsController } from '../../useCases/getBookItems'
import { getTranslateController } from '../../useCases/getTranslate'
import { getParagraphController } from '../../useCases/getParagraph'
import { getChapterController } from '../../useCases/getChapter'

const bookRouter = express.Router()

bookRouter.post('/create-bilingual', (req, res) => createBilingualController.execute(req, res))
bookRouter.get('/:id', (req, res) => getBookController.execute(req, res))
bookRouter.get('/', (req, res) => getBookItemsController.execute(req, res))
bookRouter.get('/translate', (req, res) => getTranslateController.execute(req, res))
bookRouter.get('/paragraph', (req, res) => getParagraphController.execute(req, res))
bookRouter.get('/chapter', (req, res) => getChapterController.execute(req, res))

bookRouter.get('/test', (req, res) => {
	return res.sendStatus(200)
})

export { bookRouter }
