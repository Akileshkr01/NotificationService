const notificationService = require('../services/notification.service');
const {
    successResponseBody,
    errorResponseBody
} = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');

const createTicket = async (req, res) => {
    try {
        const response = await notificationService.create(req.body);

        return res
            .status(STATUS.CREATED)
            .json({
                ...successResponseBody(),
                data: response,
                message: 'Successfully created a notification ticket'
            });

    } catch (error) {
        // Validation / known errors
        if (error.err) {
            return res
                .status(error.code || STATUS.UNPROCESSABLE_ENTITY)
                .json({
                    ...errorResponseBody(),
                    err: error.err,
                    message: 'Cannot process the request'
                });
        }

        // Unknown / system errors
        return res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({
                ...errorResponseBody(),
                err: {},
                message: 'Something went wrong, cannot process the request'
            });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const response = await notificationService.getAll();

        return res
            .status(STATUS.OK)
            .json({
                ...successResponseBody(),
                data: response,
                message: 'Successfully fetched all the tickets'
            });

    } catch (error) {
        if (error.err) {
            return res
                .status(error.code || STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    ...errorResponseBody(),
                    err: error.err,
                    message: 'Cannot process the request'
                });
        }

        return res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({
                ...errorResponseBody(),
                err: {},
                message: 'Something went wrong, cannot fetch tickets'
            });
    }
};

const getTicket = async (req, res) => {
    try {
        const response = await notificationService.getById(req.params.id);

        return res
            .status(STATUS.OK)
            .json({
                ...successResponseBody(),
                data: response,
                message: 'Successfully fetched details of the given ticket id'
            });

    } catch (error) {
        if (error.err) {
            return res
                .status(error.code || STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    ...errorResponseBody(),
                    err: error.err,
                    message: 'Cannot process the request'
                });
        }

        return res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({
                ...errorResponseBody(),
                err: {},
                message: 'Something went wrong, cannot fetch the ticket'
            });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicket
};
