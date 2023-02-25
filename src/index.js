const express = require("express");
const bodyParser = require("body-parser");

const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");
const setupJobs = require("./utils/cron-jobs");

const TicketController = require("./controllers/ticket-controller");
const EmailService = require("./services/email-service");
const emailService = new EmailService();

const { subscribeMessage, createChannel } = require("./utils/messageQueue");

const server = async () => {
    
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();
    subscribeMessage(channel, emailService.subscribeEvents , REMINDER_BINDING_KEY);

    app.post("/api/v1/tickets",TicketController.create);

    app.listen(PORT,()=>{
        console.log(`Server is running on PORT : ${PORT}`);
        setupJobs();
    });

}

server();

/**
 * [qps] -> query per secound !!
 *  [Service 1 (100qps)] ----------------> [Service 2 (20 qps)]
 * Solution 
 * [Service 1 (100qps) Publisher] ----------> Message Queue [msg1,msg2 .... msg n] ----------> [Service 2 (20 qps) Subscriber]
 */