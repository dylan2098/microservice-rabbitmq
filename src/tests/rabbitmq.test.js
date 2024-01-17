'use strict';

const {connectForRabbitMQForTest} = require('../databases/init.rabbit');

describe('RabbitMQ Connection', () => {
    it('should connect to RabbitMQ', async () => {
        const connection = await connectForRabbitMQForTest();
        console.log(connection);
        expect(connection).toBeUndefined();
    })
});