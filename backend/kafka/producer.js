const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('Kafka Producer connected');
    } catch (error) {
        console.error('Failed to connect Kafka Producer:', error);
    }
};

const sendLoginLog = async (logData) => {
    try {
        await producer.send({
            topic: 'user-logins',
            messages: [{ value: JSON.stringify(logData) }],
        });
        console.log('Login event sent to Kafka:', logData);
    } catch (error) {
        console.error('Failed to send login log to Kafka:', error);
    }
};

module.exports = {
    connectProducer,
    sendLoginLog,
};