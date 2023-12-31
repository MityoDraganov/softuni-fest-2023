require('dotenv').config();
const success_url = "http://localhost:3000/payment/success/"
const cancel_url = "http://localhost:3000/users/shop/"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createSession(product, userId) {
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
        metadata: {
            userId: userId,
            productId: product._id,
        },
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`,
    });
    return session;
}

async function createSubscriptionSession(product, userId) {
    const priceId = product.priceId;
    if (!priceId) throw new Error("No subscriptionId found");
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        metadata: {
            userId: userId,
            productId: product._id,
        },
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`,
    });
    return session;
}

async function createPrice(name, productDescription, price) {
    const product = await stripe.products.create({
        name: name,
        description: productDescription
    });
    const object = await stripe.prices.create({
        product: product.id,
        unit_amount: price * 100,
        currency: 'usd',
        recurring: { interval: 'month' },
    });
    return object;
}

async function deletePrice(id) {
    try {
        const price = await stripe.prices.retrieve(id);
        await stripe.products.update(price.product, {
            active: false
        });
        await stripe.prices.update(id, {
            active: false
        });

        console.log(`Price (ID: ${id}) and associated product archived.`);
    } catch (error) {
        console.error(`Error archiving price and product: ${error.message}`);
    }
}

module.exports = {
    createSession,
    createSubscriptionSession,
    createPrice,
    deletePrice
}