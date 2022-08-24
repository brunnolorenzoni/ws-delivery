import { Kafka } from 'kafkajs'
import { Socket, Server } from 'socket.io'
import KafkaConnect from "../infrastructure/kafka";
import KafkaRepository from '../repositories/implementation/kafka';

export default class TrakingService {
  private connection: Kafka;
  private kafkaRepository: KafkaRepository;

  constructor(private io: Server) {

    this.connection = new KafkaConnect({
      clientId: 'socket:tracking-service',
      brokers: ['localhost:9092']
    }).connection

    this.kafkaRepository = new KafkaRepository(this.connection)
    
    this.kafkaRepository.consume(['tracking'], this.handleMessages)
  }

  handleMessages = (data: any) => {
    switch (data.topic) {
      case 'tracking':
        const { key, value, headers} = data.message
        const { lat, lng } = JSON.parse(value)
        this.io.of('tracking').to(key).emit('position', { key, value: { lat: parseFloat(lat), lng: parseFloat(lng) },  headers })
        break;
      default:
        break;
    }
  }
  
  onConnect = (socket: Socket) => {
    const userId = socket.handshake.query.userId
    if(!userId) return false
    socket.join(userId)
  }
}