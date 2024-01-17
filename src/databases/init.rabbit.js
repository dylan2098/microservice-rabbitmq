'use strict';

const amqp = require('amqplib');
const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost');
        if(!connection) {
            throw new Error('No connection to RabbitMQ');
        }

        const channel = await connection.createChannel();
        if(!channel) {
            throw new Error('No channel to RabbitMQ');
        }

        return {channel, connection}
        
    } catch (error) {
        
    }
}

const connectForRabbitMQForTest = async () => {
    try {
        const {channel, connection} = await connectToRabbitMQ();

        // publish messag to queue
        const queue = 'test-queue';
        const message = 'Hello world';

        const options = {
            durable: true,
        };


        await channel.assertQueue(queue, options);

        await channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Message ${message} sent to queue ${queue}`);

        // close the connenction
        await connection.close();
    } catch (error) {
        console.log(`Error connecting to RabbitMQ`, error);
    }
}

module.exports = {
    connectToRabbitMQ,
    connectForRabbitMQForTest,
};