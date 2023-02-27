import { Result } from './src/core'
import { WsResponse } from './src/core/infra'
import { WsEvents } from './src/core/constants'

Result.ok(new WsResponse(WsEvents.WELCOME))
