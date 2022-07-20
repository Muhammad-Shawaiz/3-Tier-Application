var nodemailer = require('nodemailer');
var ResetConfirmed = require('./Template/ResetConfirmed');

async function confirmResetEmail(email) {

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
        subject: 'Password Reset Confirmed',
        text: ResetConfirmed
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = confirmResetEmail;