require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router'); // Import the router setup file

const database = process.env.DATABASE || 'mongodb://localhost:27017/payment-system';
const PORT = process.env.PORT || 3030;

async function start() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(database, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: "*",
        methods: "*",
        credentials: true
    }));
    
    app.use(router);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

start();
