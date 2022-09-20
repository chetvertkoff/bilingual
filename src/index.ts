// // @ts-nocheck
// import { GetBilingualUseCase } from './modules/book/useCases/getBilingual/GetBilingualUseCase'
// import { bookReaderService, htmlParseService, translateService } from './modules/book/services'
//
// const usecase = new GetBilingualUseCase(bookReaderService, htmlParseService, translateService)
// ;(async () => {
// 	await usecase.execute('C:\\projects\\bilingual\\upload\\book\\book.epub')
// })()
import 'reflect-metadata'
import { runHTTP } from './infra/http'
import { runDB } from './infra/db'
import { runWS } from './infra/ws'

global.__basedir = __dirname.replace('\\src', '')

runHTTP()
runDB()
runWS()
