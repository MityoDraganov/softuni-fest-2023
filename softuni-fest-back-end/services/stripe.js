require('dotenv').config();
const success_url = "http://localhost:3000/payment/success"
const cancel_url = "http://localhost:3000/payment/success"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createSession(product) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: 1,
            },
        ],
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`,
    });
    return session;
}

module.exports = {
    createSession
}