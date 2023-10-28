const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const Business = require('../models/Business');
const {
    register,
    login,
    logout,
} = require('../services/users');
const { getPurchaseHistory } = require('../utils/purchaseHistory');
const mapErrors = require('../utils/mapper');

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (
            req.body.password.trim() == '' ||
            req.body.email.trim() == '' ||
            req.body.firstName.trim() == '' ||
            req.body.lastName.trim() == ''
        ) {
            throw new Error('All fields are required');
        }
        const existing = await Business.findOne({
            email: new RegExp(`^${req.body.email}$`, 'i'),
        })
        if (existing) {
            throw new Error('Email is already registered as a business');
        }
        const result = await register(
            req.body.email.trim().toLowerCase(),
            req.body.firstName.trim(),
            req.body.lastName.trim(),
            req.body.password.trim()
        );
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and password are required');
        }
        const result = await login(
            req.body.email.trim().toLowerCase(),
            req.body.password.trim()
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});

router.get('/purchases/:id', async (req, res) => {
    if(!req.user){
        res.status(401).json({message: 'Unauthorized'})
        return;
    }
    if(req.user._id != req.params.id){
        res.status(401).json({message: 'Unauthorized'})
        return;
    }
    const purchases = await getPurchaseHistory(req.params.id);
    res.json(purchases);
});

module.exports = router;
