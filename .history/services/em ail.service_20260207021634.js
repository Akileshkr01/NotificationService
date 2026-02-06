const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection at startup
mailer.verify((error) => {
    if (error) {
        console.error(' Email service error:', error);
    } else {
        console.log(' Email service ready');
    }
});

module.exports = mailer;
