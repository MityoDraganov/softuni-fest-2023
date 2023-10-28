const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');
const businessController = require('./controllers/business');
const productsController = require('./controllers/products');
const paymentController = require('./controllers/payment');
const auth = require('./middlewares/auth');

router.use(auth());
router.use('/businesses', businessController);
router.use('/products', productsController)
router.use('/users', usersController);
router.use('/invoice', paymentController)
router.get('/', (req, res) =>
    res.json({ message: 'REST service operational' })
);

module.exports = router;
