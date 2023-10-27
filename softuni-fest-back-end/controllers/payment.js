const { getById } = require('../services/products');
const { createSession } = require('../services/stripe');
const coinbase = require('../services/coinbase');
// const opennode = require('../services/opennode');

const router = require('express').Router();


router.post('/pay/:id', async (req, res) => {
    try {
        const product = await getById(req.params.id);
        const session = await createSession(product);
        res.json({ id: session.id`1`, url: session.url });

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong' });
    }
}
)

router.post('/pay/coinbase/:id', async (req, res) => {
    try {
        const product = await getById(req.params.id);
        const charge = await coinbase.createCharge(product);
        res.json({ id: charge.id, url: charge.hosted_url });

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Something went wrong' });
    }
});

// router.post('/pay/opennode/:id', async (req, res) => {
//     try {
//         const product = await getById(req.params.id);
//         const charge = await opennode.createCharge(product);
//         res.json({url: charge});

//     } catch (e) {
//         console.log(e);
//         res.status(400).json({ message: 'Something went wrong' });
//     }
// });


module.exports = router;
