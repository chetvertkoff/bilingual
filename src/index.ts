import 'reflect-metadata'
import { runHTTP } from './infra/http'
import { runDB } from './infra/db'
import { runWS } from './infra/ws'

global.__basedir = __dirname.replace('\\src', '')

runHTTP()
runDB()
runWS()
