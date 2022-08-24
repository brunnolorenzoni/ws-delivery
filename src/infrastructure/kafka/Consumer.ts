import { Consumer, ConsumerSubscribeTopics, Kafka, EachMessagePayload } from 'kafkajs'

interface params { topic: any, message: any }
export interface MessageProcessor {
  (params: params): unknown
}

export default class ConsumerProvider {
  private consumer: Consumer

  public constructor(kafkaConnection: Kafka) {
    this.consumer = this.createKafkaConsumer(kafkaConnection)
  }

  public async startConsumer(topics: string[], messageProcessor: MessageProcessor): Promise<void> {

    const topic: ConsumerSubscribeTopics = {
      topics,
      fromBeginning: true
    }

    try {
      await this.consumer.connect()
      await this.consumer.subscribe(topic)

      await this.consumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, message } = messagePayload
          messageProcessor({
            topic,
            message: {
              key: message.key?.toString(),
              value: message.value?.toString(),
              headers:  message.headers,
            }
        })
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }


  public async shutdown(): Promise<void> {
    await this.consumer.disconnect()
  }

  private createKafkaConsumer(kafka: Kafka): Consumer {
    const consumer = kafka.consumer({ groupId: 'consumer-group' })
    return consumer
  }
}