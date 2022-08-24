import { Namespace, Server, Socket } from 'socket.io'
import { ISocketHandler } from '../../interfaces/ISocketHandler'

import TrakingService from '../../service/Tracking'

export default class TrackingListener implements ISocketHandler {
  trackinService: TrakingService

  constructor(private io: Server) {
    this.trackinService = new TrakingService(io)
  }

  async handle(namespace: Namespace) {
    namespace.on('connection', this.trackinService.onConnect)
  }
}
