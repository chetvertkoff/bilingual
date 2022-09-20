import express from 'express'
import { bookRouter } from '../../../modules/book/infra/routes'

const v1Router = express.Router()

v1Router.use('/book', bookRouter)

// All routes go here

export { v1Router }
