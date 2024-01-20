'use strict';

const {consumerQueue, consumerQueueToDead, consumerQueueToNormal } = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';
// consumerQueue(queueName)
// .then(() => {
//     console.log(`Message comsumer started ${queueName}`)
// })
// .catch((error) => {
//     console.log(`Message Error: ${error.message}`);
// })


consumerQueueToNormal(queueName).then(() => {
    console.log(`Message comsumer to queue normal started ${queueName}`)
})
.catch((error) => {
    console.log(`Message Error: ${error.message}`);
})


consumerQueueToDead(queueName).then(() => {
    console.log(`Message comsumer to queue dead started ${queueName}`)
})
.catch((error) => {
    console.log(`Message Error: ${error.message}`);
})