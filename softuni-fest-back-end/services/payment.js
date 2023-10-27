require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function processPayment(paymentAmount, customerEmail) {
    stripe.customers.create({ email: customerEmail })
        .then(customer => {
            stripe.charges.create({ amount: paymentAmount, currency: 'usd', customer: customer.id })
                .then(charge => {
                    console.log('Payment successful:', charge);
                })
                .catch(err => {
                    console.error('Error processing payment:', err);
                });
        })
        .catch(err => {
            console.error('Error creating customer:', err);
        });
}

module.exports = processPayment;
