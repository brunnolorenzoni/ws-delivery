import { Kafka, Message } from 'kafkajs';
import IQueueingRepository from '../../IKafkaRepository';

import ProducerProvider from '../../../infrastructure/kafka/Producer'; 
import ConsumerProvider, { MessageProcessor } from '../../../infrastructure/kafka/Consumer';

export default class DeliveryQueue implements IQueueingRepository {

  readonly producer: ProducerProvider;
  readonly consumer: ConsumerProvider;

  constructor(private connection: Kafka) {
    this.producer = new ProducerProvider(this.connection)
    this.consumer = new ConsumerProvider(this.connection)
  }
  
  produce = async (message: Message, topic: string): Promise<void> => {
    await this.producer.sendMessage(topic, message)
  }

  consume = async (topic: string[], callback: MessageProcessor): Promise<void> => {
    await this.consumer.startConsumer(topic, callback)
  }
  
}