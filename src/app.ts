import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import Listener from './listeners'
import { TrackingHandler } from "./listeners/tracking";

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
    const listener = new Listener(this.io)

    const trackingHandler = new TrackingHandler(this.io)
    listener.listen('/tracking', trackingHandler)
  }
}

export default new App();
