const nodemailer = require("nodemailer");
const { USER, PASS } = require("./serverConfig");

const Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: USER,
        pass: PASS
    }
})

module.exports = Transport;