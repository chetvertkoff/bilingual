import { Request, Response } from 'express'
import fs from 'fs'
import { AppError } from './AppError'
import { SimpleResponse } from './SimpleResponse'

export abstract class BaseController {
	protected req: Request
	protected res: Response

	protected get userId() {
		return this.req.get('UserId') ?? ''
	}

	protected abstract executeImpl(): Promise<void | any>

	public execute(req: Request, res: Response) {
		this.req = req
		this.res = res
		this.executeImpl()
	}

	protected async uploadStreamFile(filePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const stream = fs.createWriteStream(filePath, { highWaterMark: 1 })
			// With the open - event, data will start being written
			// from the request to the stream's destination path
			stream.on('open', () => {
				console.log('Stream open ...  0.00%')
				this.req.pipe(stream)
			})

			// Drain is fired whenever a data chunk is written.
			// When that happens, print how much data has been written yet.
			stream.on('drain', () => {
				const written = parseInt(stream.bytesWritten.toString())
				const total = parseInt(this.req.headers['content-length'])
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const pWritten = ((written / total) * 100).toFixed(2)
				console.log(`Processing  ...  ${pWritten}% done`)
			})

			// When the stream is finished, print a final message
			// Also, resolve the location of the file to calling function
			stream.on('close', () => {
				console.log('Processing  ...  100%')
				resolve(filePath)
			})
			// If something goes wrong, reject the primise
			stream.on('error', (err) => {
				// console.error(err)
				reject(err)
			})
		})
	}

	public ok<T>(res: Response, dto?: T) {
		return res.status(200).json(dto ?? new SimpleResponse())
	}

	public fail(error: Error | string) {
		return this.res.status(500).json(new AppError.UnknownError(JSON.stringify(error)))
	}
}
