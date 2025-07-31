const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
    await producer.connect();
};

const sendLoginLog = async (logData) => {
    await producer.send({
        topic: 'user-logins',
        messages: [
            { value: JSON.stringify(logData) }
        ]
    });
};

module.exports = { connectProducer, sendLoginLog };
