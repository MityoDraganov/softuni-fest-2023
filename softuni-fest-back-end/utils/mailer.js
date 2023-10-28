const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'softwarefest2@gmail.com',
        pass: 'soft1234',
    },
});

// Define a function to send an email
async function sendEmail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: 'sotftwarefest2@gmail.com',
            to,
            subject,
            text,
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = {
    sendEmail,
};