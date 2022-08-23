import { Message } from 'kafkajs'
import { MessageProcessor } from '../infrastructure/kafka/Consumer'

export default interface IKafkaRepository {
  produce: (message: Message, topic: string) => Promise<void>;
  consume: (topic: string[], callback: MessageProcessor) => Promise<void>;
}