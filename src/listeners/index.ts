import { Server } from 'socket.io'
import { ISocketHandler } from '../interfaces/ISocketHandler'

export default class Listener {
  constructor(private io: Server) {}

  listen(namespace: string, handler: ISocketHandler) {
    try {
      handler.handle(this.io.of(namespace))
    } catch (err) {
      console.error(`listen function not found for ${namespace} namespace`)
    }
  }
}