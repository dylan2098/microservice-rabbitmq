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
            // true thi khi restart lai thi queue van ton tai
            // false thi khi restart lai thi queue se mat
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


const consumerQueue = async (chanel, queueName) => {
    try {
        await chanel.assertQueue(queueName, {durable: true});
        console.log(`Waiting for message in ${queueName}`);

        // TODO: 
        //! 1. find User following taht Shop
        //! 2. send message to user
        //! 3. yes, ok => success
        //!4. error. setup Dead Letter Exchange

        chanel.consume(queueName, msg => {
            console.log(`Received message ${msg.content.toString()}`);
        }, {noAck: true});

        // noAck: true thi khi nhan message thi se ko gui lai cho server (nghia la da nhan duoc message va xu ly xong)
        // noAck: false thi khi nhan message thi se gui lai cho server (nghia la chua nhan duoc message va chua xu ly xong => server se gui lai message cho consumer khac xu ly)

    } catch (error) {
        console.error(`Error publishing message ${message} to queue ${queueName}`, error);
        throw error;
    }
}


module.exports = {
    connectToRabbitMQ,
    connectForRabbitMQForTest,
    consumerQueue
};