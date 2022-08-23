import { Server } from 'socket.io'
import Listener from '../listeners/'

const use = async (socketio: Server) => {
  const listener = new Listener(socketio)

  // const clientHandler = new ClientHandler(socketio)
  // const adminHandler = new AdminHandler(socketio)

  // listener.listen('/client', clientHandler)
  // listener.listen('/admin', adminHandler)
}

export default { use }
