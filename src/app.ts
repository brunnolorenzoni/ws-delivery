import express from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import Listeners from './listeners'

class App {
  public http: HttpServer;
  public io: SocketServer;

  constructor() {
    this.http = createServer(express());
    this.io = new SocketServer(this.http, {
      path: '/',
      cors: {
        origin: '*',
      }
    })

    this.listeners()
  }

  listeners() {
    new Listeners(this.io).routing()
  }
}

export default new App();
