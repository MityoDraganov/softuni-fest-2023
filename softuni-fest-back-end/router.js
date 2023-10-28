const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');
const businessController = require('./controllers/business');
const productsController = require('./controllers/products');
const paymentController = require('./controllers/payment');
const auth = require('./middlewares/auth');
const { sendEmail } = require('./utils/mailer');

router.use(auth());
router.use('/businesses', businessController);
router.use('/products', productsController)
router.use('/users', usersController);
router.use('/invoice', paymentController)
router.get('/', (req, res) =>
    res.json({ message: 'REST service operational' })
);
router.post('/email', (req, res) => {
    const { email, subject, text } = req.body;
    if (!email || !subject || !text) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    sendEmail(email, subject, text);
    res.json({ message: 'Email sent' });
});

module.exports = router;
