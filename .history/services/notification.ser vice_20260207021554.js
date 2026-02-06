const mongoose = require('mongoose');
const Ticket = require('../models/ticketNotification');
const { STATUS } = require('../utils/constants');

const create = async (data) => {
    try {
        const ticket = await Ticket.create(data);
        return ticket;
    } catch (error) {
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const err = new Error('Validation failed');
            err.details = {};
            Object.keys(error.errors).forEach((key) => {
                err.details[key] = error.errors[key].message;
            });
            err.code = STATUS.UNPROCESSABLE_ENTITY;
            throw err;
        }

        // Re-throw any other errors
        if (!error.code) error.code = STATUS.INTERNAL_SERVER_ERROR;
        throw error;
    }
};

const getAll = async () => {
    try {
        const response = await Ticket.find();
        return response;
    } catch (error) {
        const err = new Error(`Failed to fetch tickets: ${error.message}`);
        err.code = STATUS.INTERNAL_SERVER_ERROR;
        throw err;
    }
};

const getById = async (id) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid ticket ID');
            error.code = STATUS.BAD_REQUEST;
            throw error;
        }

        const response = await Ticket.findById(id);

        if (!response) {
            const error = new Error('No ticket details found');
            error.code = STATUS.NOT_FOUND;
            throw error;
        }

        return response;
    } catch (error) {
        if (!error.code) error.code = STATUS.INTERNAL_SERVER_ERROR;
        throw error;
    }
};

module.exports = {
    create,
    getAll,
    getById
};
