import { Kafka, KafkaConfig, logLevel } from "kafkajs";

export default class KafkaConnect {

  connection: Kafka;

  constructor(readonly kafkaConfig: KafkaConfig) {
    if (!kafkaConfig.logLevel) kafkaConfig.logLevel = logLevel.NOTHING
    this.connection = new Kafka(kafkaConfig);
  }
}