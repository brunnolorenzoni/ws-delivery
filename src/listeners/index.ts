import { Server } from 'socket.io'
import { ISocketHandler } from '../interfaces/ISocketHandler'

import { TrackingHandler } from './tracking'

export default class Listener {

  trackingHandler: TrackingHandler

  constructor(private io: Server) {
    this.trackingHandler = new TrackingHandler(this.io)
  }

  private listen(namespace: string, handler: ISocketHandler) {
    try {
      handler.handle(this.io.of(namespace))
    } catch (err) {
      console.error(`listen function not found for ${namespace} namespace`)
    }
  }

  exec() {
    this.listen('/tracking', this.trackingHandler)
  }

}