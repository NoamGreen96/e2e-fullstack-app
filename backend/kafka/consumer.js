const { Kafka } = require('kafkajs');
const logger = require('../utils/logger');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-logins-group' });

const runConsumer = async () => {
  try {
    logger.info('Connecting Kafka Consumer...');

    await consumer.connect();
    await consumer.subscribe({ topic: 'user-logins', fromBeginning: true });

    logger.info('Kafka Consumer connected and listening...');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('New message received:');
        console.log({
          timestamp: new Date().toISOString(),
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {
    logger.error('Error in Kafka Consumer:', error);
  }
};

process.on('SIGINT', async () => {
  logger.info('Disconnecting Kafka consumer...');
  await consumer.disconnect();
  process.exit(0);
});

module.exports = { runConsumer };
