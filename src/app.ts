import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import Listeners from './listeners'
class App {
  public http: HttpServer;
  public io: SocketServer;
  public app: Application;

  constructor() {
    this.app = express()
    this.http = createServer(this.app);
    this.io = new SocketServer(this.http, {
      path: '/',
      cors: {
        origin: /(localhost)+:[0-9]{4}/,
      }
    })

    this.listeners()
  }

  listeners() {
    new Listeners(this.io).routing()
  }
}

export default new App();
