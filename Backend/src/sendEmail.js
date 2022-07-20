var nodemailer = require('nodemailer');
var emailTemplate = require('./Template/emailTemplate');

async function sendEmail(id, email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.senderEmail,
            pass: process.env.senderPassword,
        }
    });

    var mailOptions = {
        from: process.env.senderEmail,
        to: email,
        subject: 'Reset Password',
        html: emailTemplate.replace('$id', id)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;