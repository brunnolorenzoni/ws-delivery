import { Namespace, Server } from 'socket.io'
import { ISocketHandler } from '../../interfaces/ISocketHandler'

class TrackingHandler implements ISocketHandler {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  async handle(namespace: Namespace) {
    namespace.on('connection', (socket) => {
      console.log(socket.id);
    })
  }
}

export { TrackingHandler }
