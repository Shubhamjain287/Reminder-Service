const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const setupJobs = require("./utils/cron-jobs");

const cron = require("node-cron");
const TicketController = require("./controllers/ticket-controller");

const server = () => {
    
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post("/api/v1/tickets",TicketController.create);

    app.listen(PORT,()=>{
        console.log(`Server is running on PORT : ${PORT}`);
        setupJobs();
        // cron.schedule('*/1 * * * *', ()=>{
        //     console.log(`Hello Shubham`);
        // })
    });

}

server();