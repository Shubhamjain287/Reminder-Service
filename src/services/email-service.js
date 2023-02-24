const Transport = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

class EmailService{

    constructor(){
        this.ticketRepository = new TicketRepository();
    }

    async sendBasicEmail(mailFrom, mailTo, message, body){
        Transport.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: message,
            text: body
        });
    }

    async fetchPendingEmail(){
        try {
            const response = await this.ticketRepository.get({status: "PENDING"});
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createNotification (data){
        try {
            const response = await this.ticketRepository.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateTicket (ticketId, data){
        try {
            const response = await this.ticketRepository.update(ticketId,data);
            return response;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = EmailService;