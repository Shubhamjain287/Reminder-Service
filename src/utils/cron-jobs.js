const cron = require("node-cron");
const Transport = require("../config/emailConfig");
const EmailService = require("../services/email-service");

/**
 * 10:00 am
 * Every 5 Minites
 * We Will Check are their Pending Emails which was expected to send.
 * by now and is Pending
 */

const emailService = new EmailService()

const setupJobs = async () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmail();
    
        response.forEach((email) => {
            Transport.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "SUCCESS"})
                }
            });
        });
        console.log(response);
    });
}

module.exports = setupJobs;