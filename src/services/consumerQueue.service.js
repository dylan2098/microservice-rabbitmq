'use strict';

const {
    consumerQueue,
    connectToRabbitMQ
} = require('../databases/init.rabbit');

const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const {channel, connection} = await connectToRabbitMQ();
            await consumerQueue(channel, queueName);
            await connection.close();
        } catch (error) {
            console.log(`Error connecting to RabbitMQ`, error);
        }
    }
}

module.exports = messageService;