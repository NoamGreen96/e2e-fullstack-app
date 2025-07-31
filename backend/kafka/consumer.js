const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-logins-group' });

const runConsumer = async () => {
  try {
    console.log('Connecting Kafka Consumer...');
    await consumer.connect();
    await consumer.subscribe({ topic: 'user-logins', fromBeginning: true });
    console.log('Kafka Consumer connected and listening...');

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
    console.error('Error in Kafka Consumer:', error);
  }
};

process.on('SIGINT', async () => {
  console.log('Disconnecting Kafka consumer...');
  await consumer.disconnect();
  process.exit(0);
});

module.exports = { runConsumer };