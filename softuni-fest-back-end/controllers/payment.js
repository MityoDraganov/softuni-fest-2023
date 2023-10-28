const { getById } = require('../services/products');
const { createSession, createSubscriptionSession, createProduct } = require('../services/stripe');
const coinbase = require('../services/coinbase');
const objectIdValidator = require('../middlewares/objectIdValidator');
const { addPurchaseHistory } = require('../utils/addPurchaseHistory');
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
            const session = await createSubscriptionSession(product);
            res.json({ id: session.id, url: session.url });
        } else {
            const session = await createSession(product);
            res.json({ id: session.id, url: session.url });
        }
        addPurchaseHistory(req.user._id, req.params.id)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong ' + e.message });

    }
}
)

router.post('/createPrice/:id', async (req, res) => {
    try {
        const product = await getById(req.params.id);
        const price = await createProduct(product.name, product.price)
        res.json(price);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong ' + e.message });
    }
});

router.post('/pay/coinbase/:id', objectIdValidator(), async (req, res) => {
    try {
        if (!req.user) {
            throw new Error('You need to be logged in to make a payment');
        }
        const product = await getById(req.params.id);
        const charge = await coinbase.createCharge(product);
        res.json({ id: charge.id, url: charge.hosted_url });

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
