import express from 'express'
import { createBilingualController } from '../../useCases/createBilingual'
import { getBilingualController } from '../../useCases/getBilingual'
import { getBilingualItemsController } from '../../useCases/getBilingualItems'
import { getTranslateController } from '../../useCases/getTranslate'

const bookRouter = express.Router()

bookRouter.post('/create-bilingual', (req, res) => createBilingualController.execute(req, res))
bookRouter.get('/bilingual/:id', (req, res) => getBilingualController.execute(req, res))
bookRouter.get('/bilingual', (req, res) => getBilingualItemsController.execute(req, res))
bookRouter.get('/translate', (req, res) => getTranslateController.execute(req, res))
bookRouter.get('/test', (req, res) => {
	return res.sendStatus(200)
})

export { bookRouter }
