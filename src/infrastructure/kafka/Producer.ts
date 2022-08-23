import { Kafka, Producer, ProducerRecord, Partitioners, Message  } from 'kafkajs'

export default class ProducerProvider {
  private producer: Producer

  public constructor(kafkaConnection: Kafka) {
    this.producer = this.createKafkaProducer(kafkaConnection)
  }

  public async sendMessage(topic: string, message: Message): Promise<void> {
    const record: ProducerRecord = { topic, messages: [ message ] }
    await this.producer.connect()
    await this.producer.send(record).catch(e => console.error(`[producer error] ${e.message}`, e))
  }


  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  private createKafkaProducer(kafka: Kafka): Producer {
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
    return producer
  }
}