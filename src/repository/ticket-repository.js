const { Op } = require("sequelize");
const { NotificationTicket } = require("../models/index");

class TicketRepository{

    async getAll(){
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async get(filter){
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime :{
                        [Op.lte] : new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async create(data){
        try {
          const ticket = await NotificationTicket.create(data);
          return ticket;  
        } catch (error) {
            throw error;
        }
    }

    async update(ticketId,data){
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);

            if(data.status){
                ticket.status = data.status;
            }
            else{
                ticket.subject = data.subject,
                ticket.content = data.content,
                ticket.recepientEmail = data.recepientEmail,
                ticket.notificationTime = data.notificationTime
            }

            await ticket.save();

            return ticket;
        } catch (error) {
            throw error;
        }
    }

    async destroy (ticketId){
        try {
            await NotificationTicket.destroy({
                where: ticketId
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = TicketRepository;