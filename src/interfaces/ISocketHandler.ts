import { Namespace } from 'socket.io' 

export interface ISocketHandler {
  handle(namespace: Namespace): void
}