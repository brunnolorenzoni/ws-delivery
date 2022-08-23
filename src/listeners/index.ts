import { Server } from 'socket.io'
import { ISocketHandler } from '../interfaces/ISocketHandler'

import TrackingListener from './tracking'

export default class Listeners {

  trackingListener: TrackingListener

  constructor(private io: Server) {
    this.trackingListener = new TrackingListener(this.io)
  }

  private listen(namespace: string, handler: ISocketHandler) {
    try {
      handler.handle(this.io.of(namespace))
    } catch (err) {
      console.error(`listen function not found for ${namespace} namespace`)
    }
  }

  routing() {
    this.listen('/tracking', this.trackingListener)
  }

}