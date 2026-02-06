const cron = require('node-cron');
const Ticket = require('../models/ticketNotification');
const mailer = require('../services/email.service');

const mailerCron = () => {

    cron.schedule('*/2 * * * *', async () => {
        console.log(' Executing Mailer Cron');

        try {
            const notifications = await Ticket.find({ status: 'PENDING' });

            for (const notification of notifications) {
                const mailData = {
                    from: process.env.EMAIL,
                    to: notification.recipientEmails,
                    subject: notification.subject,
                    text: notification.content
                };

                try {
                    await mailer.sendMail(mailData);

                    notification.status = 'SUCCESS';
                    await notification.save();

                    console.log(` Mail sent to ${notification.recipientEmails}`);
                } catch (mailError) {
                    console.error(' Mail failed:', mailError);
                }
            }

        } catch (error) {
            console.error(' Cron execution error:', error);
        }
    });
};

module.exports = { mailerCron };
