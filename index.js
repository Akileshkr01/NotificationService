const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// cron
const { mailerCron } = require('./crons/cron');

// routes
const ticketRoutes = require('./routes/ticket.routes');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ticketRoutes(app);

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        const isProduction = process.env.NODE_ENV === 'production';

        const dbUrl = isProduction
            ? process.env.PROD_DB_URL   // MongoDB Atlas
            : process.env.DB_URL;       // Local MongoDB

        if (!dbUrl) {
            throw new Error(
                isProduction
                    ? 'PROD_DB_URL is missing in .env'
                    : 'DB_URL is missing in .env'
            );
        }

        await mongoose.connect(dbUrl);

        console.log(
            ` Successfully connected to MongoDB (${isProduction ? 'Atlas / Production' : 'Local / Development'})`
        );

        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });

        mailerCron();
        console.log(' Mailer cron started');

    } catch (error) {
        console.error(' Server failed to start:', error.message);
        process.exit(1);
    }
}

startServer();
