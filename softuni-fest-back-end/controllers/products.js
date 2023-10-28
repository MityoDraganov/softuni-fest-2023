const router = require('express').Router();
const { getAll, create, getById, deleteById, update, getByOwner } = require('../services/products');
const mapErrors = require('../utils/mapper');
const { isBusiness } = require('../middlewares/guards');
const objectIdValidator = require('../middlewares/objectIdValidator');
// const { ObjectId } = require('mongoose').Types;

router.get('/', async (req, res) => {
    const data = await getAll();
    if (data) {
        res.json(data)
    }
    else {
        res.end()
    }
});

router.post('/create', isBusiness(), async (req, res) => {
    const { name, description, price } = req.body;
    if(!name || !description || !price || !req.user || typeof price !== 'number'){
        res.status(400).json({ message: 'All fields are required and price must be a number' });
        return;
    }
    try {
        const result = await create(name, description, price, req.user._id);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/:id', objectIdValidator(), async (req, res) => {
    const data = await getById(req.params.id);
    if (data) {
        res.json(data)
    }
    else {
        res.end()
    }
});

router.get('/getByOwner/:id', objectIdValidator(), async (req, res) => {
    const data = await getByOwner(req.params.id);
    if (data) {
        res.json(data)
    }
    else {
        res.end()
    }
});





router.put('/edit/:id', isBusiness(), objectIdValidator, async (req, res) => {
    const { name, description, price } = req.body;
    if(!name || !description || !price || !req.user || typeof price !== 'number'){
        res.status(400).json({ message: 'All fields are required and price must be a number' });
        return;
    }
    try {
        const record = await getById(req.params.id);
        if(!record){
            throw new Error('Product not found');
        }
        if (record.owner != req.user._id) {
            res.status(403).json({ message: 'You are not allowed to edit this record' });
            return;
        }
        try {
            const result = await update(record, { name, description, price });
            res.status(201).json(result);
        } catch (err) {
            const error = mapErrors(err);
            res.status(400).json({ message: error });
        }
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.delete('/delete/:id', isBusiness(), objectIdValidator(), async (req, res) => {
    try {
        const record = await getById(req.params.id);
        if(!record){
            throw new Error('Product not found');
        }
        if (record.owner != req.user._id) {
            res.status(403).json({ message: 'You are not allowed to delete this record' });
            return;
        }
        await deleteById(req.params.id);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.status(204).end();
});


module.exports = router;
