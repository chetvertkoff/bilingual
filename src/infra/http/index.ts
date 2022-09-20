// @ts-nocheck
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { isProduction } from '../../config'
import { v1Router } from './api'

export const runHTTP = async () => {
	const app = express()

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	// app.use(cors(origin))
	// app.use(compression())
	app.use(helmet())
	// app.use(morgan('combined'))

	app.use('/api/v1', v1Router)

	// New api versions can go here

	app.listen(4000, () => {
		console.log(`[App]: Server listening on 4000`)
	})
}
