const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'db-changes-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'db-changes', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                timestamp: new Date().toISOString(),
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
        },
    });
};

run().catch(console.error);
