import { Kafka } from 'kafkajs'
import KafkaConnect from "../infrastructure/kafka";
import ConsumerProvider from '../infrastructure/kafka/Consumer';
import { Socket } from 'socket.io'

export default class TrakingService {
  queueConnection: Kafka;
  constructor() {
    this.queueConnection = new KafkaConnect({
      clientId: 'socket:tracking-service',
      brokers: ['localhost:9092']
    }).connection
  }

  consumeTracking = (callback: any) => {
    new ConsumerProvider(this.queueConnection).startConsumer(['tracking'], ({ message }) => {
      const { key, value, headers} = message
      const { lat, lng } = JSON.parse(value)
      callback({ key, value: { lat: parseFloat(lat), lng: parseFloat(lng) },  headers })
    })
  }
  
}