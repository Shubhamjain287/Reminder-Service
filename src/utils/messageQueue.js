const amqplib = require("amqplib");
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require("../config/serverConfig");

const createChannel = async () => {
    try {

        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);

        return channel;

    } catch (error) {
        console.log(error);
    }
}

const subscribeMessage = async (channel, service, binding_key) => {

    try {
        const applicationQueue = await channel.assertQueue('EMAIL_QUEUE');

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
        console.log('Data Receiverd');
        console.log(msg.content.toString());

        const payload = JSON.parse(msg.content.toString());
        service(payload);
        channel.ack(msg);

        // if(payload.service == "Demo_Service"){
        //     console.log("Call Demo Service");
        //     service.testingQueue(payload);
        // }
        // service(msg.content.toString());

    });
    } catch (error) {
       throw error; 
    }

}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('EMAIL_QUEUE')
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}