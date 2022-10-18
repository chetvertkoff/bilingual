import express from 'express'
import { createBilingualController } from '../../useCases/createBilingual'

const bookRouter = express.Router()

bookRouter.post('/create-bilingual', (req, res) => createBilingualController.execute(req, res))

export { bookRouter }
