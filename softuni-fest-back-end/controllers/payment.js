const { getById } = require('../services/products');

require('dotenv').config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const success_url = process.env.SUCCESS_URL;
const cancel_url = process.env.CANCEL_URL;


router.post('/pay/:id', async(req, res) => {
    const product = await getById(req.params.id);
    try{
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
            success_url: success_url,
            cancel_url: cancel_url,
        });
        res.json({ id: session.id, url: session.url });

    }catch(e){
        console.log(e);
        res.status(400).json({message: 'Something went wrong'});
    }
}
)

module.exports = router;
