const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const usersController = require('./controllers/users');
const businessController = require('./controllers/business');
const productsController = require('./controllers/products');
const auth = require('./middlewares/auth');

const database = "mongodb://127.0.0.1:27017/payment-system";

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
    }))
    app.use(auth());
    app.use('/businesses', businessController);
    app.use('/products', productsController)
    app.use('/users', usersController);

    app.get('/', (req, res) =>
        res.json({ message: 'REST service operational' })
    );

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
    // app.listen(PORT, '0.0.0.0', () => {
    //     console.log(`Server started on port ${PORT}`);
    // });
}

start()