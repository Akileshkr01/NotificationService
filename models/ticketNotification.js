const mongoose = require('mongoose');

const ticketNotificationSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String,
      required: true,
      trim: true
    },

    recipientEmails: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one recipient email is required'
      }
    },

    status: {
      type: String,
      enum: {
        values: ['SUCCESS', 'FAILED', 'PENDING'],
        message: 'Invalid ticket status'
      },
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

const TicketNotification = mongoose.model(
  'TicketNotification',
  ticketNotificationSchema
);

module.exports = TicketNotification;
