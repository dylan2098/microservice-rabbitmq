'use strict';

const {consumerQueue } = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';
consumerQueue(queueName)
.then(() => {
    console.log(`Message comsumer started ${queueName}`)
})
.catch((error) => {
    console.log(`Message Error: ${error.message}`);
})
