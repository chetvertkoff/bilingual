import express from 'express'
import { getBilingualController } from '../../useCases/getBilingual'
const bookRouter = express.Router()

bookRouter.post('/get-bilingual', (req, res) => getBilingualController.execute(req, res))

export { bookRouter }
