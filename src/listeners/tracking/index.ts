import { Namespace, Server, Socket } from 'socket.io'
import { ISocketHandler } from '../../interfaces/ISocketHandler'

import TrakingService from '../../service/Tracking'

export default class TrackingListener implements ISocketHandler {
  private io: Server
  trackinService: TrakingService

  constructor(io: Server) {
    this.io = io
    this.trackinService = new TrakingService()
    console.log('TrackingHandler')
  }

  async handle(namespace: Namespace) {

    namespace.on('connection', (socket: Socket) => {
      const userId = socket.handshake.query.userId
      if(!userId) return false
      socket.join(userId)
      this.trackinService.consumeTracking((data: any) => {
        namespace.to(userId).emit('position', data);
      })
    })
  }
}
