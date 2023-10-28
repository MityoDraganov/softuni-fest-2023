const { getById } = require('../services/products');
const { createSession, createSubscriptionSession, createProduct } = require('../services/stripe');
const coinbase = require('../services/coinbase');
const objectIdValidator = require('../middlewares/objectIdValidator');
const { addPurchaseHistory } = require('../utils/purchaseHistory');
// const opennode = require('../services/opennode');

const router = require('express').Router();


router.post('/pay/:id', objectIdValidator(), async (req, res) => {
    try {
        if (!req.user) {
            throw new Error('You need to be logged in to make a payment');
        }
        const product = await getById(req.params.id);
        if(!product){
            throw new Error('Product not found');
        }
        if (product.priceId) {
            const session = await createSubscriptionSession(product, req.user._id);
            res.json({ id: session.id, url: session.url });
        } else {
            const session = await createSession(product, req.user._id);
            res.json({ id: session.id, url: session.url });
        }
        addPurchaseHistory(req.user._id, req.params.id, "stripe")
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong ' + e.message });

    }
}
)

router.post('/stripe-webhook', async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, 'your_webhook_secret');
    } catch (err) {
        console.error(err);
        return res.status(400).send('Webhook Error');
    }

    // Handle the specific event type
    if (event.type === 'checkout.session.completed') {
        // Payment was successful, add purchase history to the user
        const productId = event.data.object.metadata.productId;
        const userId = event.data.object.metadata.userId;
        addPurchaseHistory(userId, productId, "stripe");
    }

    res.sendStatus(200);
});

router.post('/coinbase-webhook', async (req, res) => {
    const rawBody = req.body;
    const signature = req.headers['x-cc-webhook-signature'];

    try {
        await coinbase.handleWebhook(rawBody, signature);
    } catch (err) {
        console.error(err);
        return res.status(400).send('Webhook Error');
    }

    res.sendStatus(200);
});

router.post('/pay/coinbase/:id', objectIdValidator(), async (req, res) => {
    try {
        if (!req.user) {
            throw new Error('You need to be logged in to make a payment');
        }
        const product = await getById(req.params.id);
        if(!product){
            throw new Error('Product not found');
        }
        if(product.priceId){
            throw new Error('Coinbase does not support subscriptions');
        }
        const charge = await coinbase.createCharge(product, req.user._id);
        res.json({ id: charge.id, url: charge.hosted_url });
        addPurchaseHistory(productMetadata.customer_id, productMetadata.product_id, "coinbase")

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong ' + e.message });
    }
});

// router.post('/pay/opennode/:id', async (req, res) => {
//     try {        
// if(!req.user){
// throw new Error('You need to be logged in to make a payment');
// }
//         const product = await getById(req.params.id);
//         const charge = await opennode.createCharge(product);
//         res.json({url: charge});

//     } catch (e) {
//         console.log(e);
//         res.status(400).json({ message: 'Something went wrong' });
//     }
// });


module.exports = router;
