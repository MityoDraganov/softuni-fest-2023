const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const User = require('../models/User');
const {
    register,
    logout,
    getAll,
} = require('../services/businesses');
const mapErrors = require('../utils/mapper');

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (
            req.body.password.trim() == '' ||
            req.body.email.trim() == '' ||
            req.body.companyName.trim() == ''
        ) {
            throw new Error('All fields are required');
        }
        const existing = await User.findOne({
            email: new RegExp(`^${req.body.email}$`, 'i'),
        })
        if (existing) {
            throw new Error('Email is already registered as a client');
        }

        const result = await register(
            req.body.email.trim().toLowerCase(),
            req.body.companyName.trim(),
            req.body.password.trim()
        );
        res.status(201).json(result);
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

router.get('/getAll', async (req, res) => {
    const businesses = await getAll();
    res.json(businesses);
});

module.exports = router;
