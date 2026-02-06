const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');

const verifyTicketNotificationCreateRequest = async (req, res, next) => {
    if (!req.body.subject) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'No subject provided for the email'
        });
    }

    if (!req.body.content) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'No content provided for the email'
        });
    }

    if (!req.body.recipientEmails || !Array.isArray(req.body.recipientEmails) || req.body.recipientEmails.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'No recipient emails provided'
        });
    }

    next();
};

module.exports = {
    verifyTicketNotificationCreateRequest
};
