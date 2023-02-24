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
        
    }
}

module.exports = {
    create
}