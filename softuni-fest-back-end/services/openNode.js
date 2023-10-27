require('dotenv').config();
const opennode = require('opennode');
opennode.setCredentials('59792fb4-1458-42e4-b3a6-e039086100c4', 'dev');


async function createCharge(product) {
    const charge = {
        amount: product.price,
        description: product.description,
        currency: "USD",
        order_id: product.id,
        customer_email: "sample@sample.com",
        notif_email: "sample@sample.com",
        customer_name: "nakamoto",
        callback_url: 'http://localhost:3000/payment/callback',
        success_url: 'http://localhost:3000/payment/success',
        auto_settle: true,
        ttl: 10
    }
    const chargeResponse = await opennode.createCharge(charge);
    return $`https://dev-checkout.opennode.com/${chargeResponse.data.id}`;
};

module.exports = {
    createCharge
}