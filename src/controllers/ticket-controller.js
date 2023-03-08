const EmailService = require("../services/email-service");

const emailService = new EmailService();

const create = async (req,res) => {
    try {
        const response = await emailService.createNotification(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully Registered an email for reminder",
            err: {}
        });
    } catch (error) {
        console.log(error);
    }
}

const update = async (req,res) => {
    try {
        const response = await emailService.updateTicket(req.params.id, req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully Updated an reminder",
            err: {}
        });
    } catch (error) {
        console.log(error);
    }
}

const destroy = async (req,res) => {
    try {
        const response = await emailService.deleteTicket(req.params);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully Deleted an reminder",
            err: {}
        });
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    create,
    update,
    destroy
}