const Transport = require("../config/emailConfig");

class EmailService{

    async SendBasicEmail(mailFrom, mailTo, message, body){
        Transport.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: message,
            text: body
        });
    }

}

module.exports = EmailService;