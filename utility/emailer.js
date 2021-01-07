const nodemailer = require('nodemailer')
require('dotenv/config')

function SendEmail(emailID, code) {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILER_EMAIL,
            pass: process.env.EMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: 'no-reply@abagauss.com',
        to: emailID,
        subject: 'Password Reset Code',
        text: "Your password reset code is " + code
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error){
            throw error
        } else {
            return ('Email send: ' + info.response)
        }
    })

}

module.exports = SendEmail