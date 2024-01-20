"use strict";

const { consumerQueue, connectToRabbitMQ } = require("../databases/init.rabbit");

const messageService = {
  consumerQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
      await connection.close();
    } catch (error) {
      console.log(`Error connecting to RabbitMQ`, error);
    }
  },

  consumerQueueToNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notiQueue = "notificationQueueProcess"; //assert queue

      // 1. TTL
      //   channel.consume(
      //     notiQueue,
      //     async (msg) => {
      //       console.log("Send notificationQueue successfully processed: ", msg.content.toString());
      //       channel.ack(msg);
      //     },
      //     { noAck: false }
      //   );

      // 2. LOGIC
      channel.consume(notiQueue, (msg) => {
        const numberTest = Math.random();
        console.log({ numberTest });

        if (numberTest < 0.8) {
          throw new Error("Error: pls hot fix");
        }

        console.log(`Send notificationQueue successfully processed: ${msg.content.toString()}`);
        channel.ack(msg);
      });
    } catch (error) {
        channel.nack(msg, false, false)  // negative acknowledgement
        // tham so 1: true: co nhiem vu gui ve queue normal - false: co nhiem vu gui ve queue dead
        // tham so 2: true: co tu choi nhieu thu ko - false: chi tu choi 1 thu
        throw error;
    }
  },

  consumerQueueToDead: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();

      const notificationExchangeDLX = "notificationExchangeDLX";
      const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";
      const notiQueueHandler = "notificationQueueHandler";

      await channel.assertExchange(notificationExchangeDLX, "direct", { durable: true });

      const queueResult = await channel.assertQueue(notiQueueHandler, {
        exclusive: false,
      });

      await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);
      await channel.consume(
        queueResult.queue,
        async (msgFailed) => {
          console.log("This notification  error: pls hot fix ", msgFailed.content.toString());
          channel.ack(msg);
        },
        { noAck: false }
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = messageService;
