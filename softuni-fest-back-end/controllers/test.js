const processPayment = require('../services/payment');

const router = require('express').Router();

router.get('/', (req, res) => {
    processPayment(1000, 'testmail@abv.bg');
    res.send('TestPayment sent');
});

module.exports = router;