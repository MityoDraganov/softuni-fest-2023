// coinbase.js

require('dotenv').config();

const { Client, Webhook, resources } = require('coinbase-commerce-node');
const { addPurchaseHistory } = require('../utils/purchaseHistory');

// Constants
const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const PAYMENT_SUCCESS_URL = process.env.PAYMENT_SUCCESS_URL;

// Initialize client
Client.init(COINBASE_API_KEY);

// Resources
const { Charge } = resources;

// Utilities
function validateChargeData(data) {
    if (!data.name) {
        Console.log('Name is required');
        return false;
    }

    if (!data.description) {
        Console.log('Description is required');
        return false;

    }

    if (!data.price) {
        Console.log('Price amount is required');
        return false;
    }

    return true;
}

async function createCharge(product, userId) {

    // Validate product data
    if (!validateChargeData(product)) {
        throw new Error('Invalid product data');
    }

    // Create charge data
    const chargeData = {
        name: product.name,
        description: product.description,
        pricing_type: 'fixed_price',
        local_price: {
            currency: 'USD',
            amount: product.price,
        },
        metadata: {
            // Add custom metadata fields here
            product_id: product.productId,
            customer_id: userId,
            // Add more metadata fields as needed
        },
        redirect_url: PAYMENT_SUCCESS_URL
    };

    // Create charge
    const charge = await Charge.create(chargeData);

    return charge;
}

async function handleWebhook(rawBody, signature) {

    let webhook;
    let productMetadata;

    try {
        const webhookData = req.body
        productMetadata = webhookData.event.data.metadata;
        // Verify webhook signature
        webhook = Webhook.verifySignature(rawBody, signature, COINBASE_API_KEY);

    } catch (error) {
        console.error('Webhook signature verification failed!', error);
        return;
    }

    // Handle webhook by type
    switch (webhook.type) {

        case 'charge:confirmed':
            console.log('Charge confirmed!', webhook.data);
            addPurchaseHistory(productMetadata.customer_id, productMetadata.product_id, "coinbase")
            break;

        case 'charge:failed':
            console.error('Charge failed!', webhook.data);
            break;

        default:
            console.log(`Unhandled webhook type: ${webhook.type}`);

    }

}

// Export functions
module.exports = {
    createCharge,
    handleWebhook
};