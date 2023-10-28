require('dotenv').config();
const success_url = "http://localhost:3000/payment/success"
// const cancel_url = (id) => "http://localhost:3000/users/shop/" + id
const cancel_url = "http://localhost:3000/users/shop/"
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

async function createSubscriptionSession(product) {
    const priceId = product.subscriptionId;
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
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`,
    });
    return session;
}

async function createPrice(name, productDescription, price) {
    const product = await stripe.products.create({
        name: name,
        description: productDescription
        // add description
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
        // Retrieve the price to get the associated product ID
        const price = await stripe.prices.retrieve(id);

        // Delete the price
        await stripe.prices.remove(id);

        // Delete the associated product
        await stripe.products.del(price.product);

        console.log(`Price (ID: ${id}) and associated product deleted.`);
    } catch (error) {
        console.error(`Error deleting price and product: ${error.message}`);
    }
}

module.exports = {
    createSession,
    createSubscriptionSession,
    createPrice,
    deletePrice
}