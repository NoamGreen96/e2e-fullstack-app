const { Kafka } = require('kafkajs');
const logger = require('../utils/logger');

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    logger.info('Kafka Producer connected');
  } catch (error) {
    logger.error('Failed to connect Kafka Producer:', error);
  }
};

const sendLoginLog = async (logData) => {
  try {
    await producer.send({
      topic: 'user-logins',
      messages: [{ value: JSON.stringify(logData) }],
    });
    logger.info('Login event sent to Kafka:');
    logger.info(logData);
  } catch (error) {
    logger.error('Failed to send login log to Kafka:', error);
  }
};

module.exports = {
  connectProducer,
  sendLoginLog,
};
