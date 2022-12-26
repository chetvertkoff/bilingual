import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { v1Router } from './api'

export const runHTTP = async () => {
	const app = express()

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(cors())
	app.use(helmet())
	app.use('/api/v1', v1Router)

	app.listen(4000, () => {
		console.log(`[App]: Server listening on 4000`)
	})
}
