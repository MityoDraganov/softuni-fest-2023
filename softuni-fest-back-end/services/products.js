const req = require('express/lib/request');
const Product = require('../models/Product');
const Business = require('../models/Business');


async function getAll() {
    return Product.find({})
        .populate({
            path: 'owner',
            select: '-hashedPassword' // exclude hashedPassword
        }).lean();
}

async function create(name, description, price, owner) {
    const result = new Product({ name, description, price, owner });
    await result.save();

    return result;
}

async function getById(id) {
    return await Product.findById(id)
        .populate({
            path: 'owner',
            select: '-hashedPassword' // exclude hashedPassword
        }).lean();;
}

async function getByIdForEdit(id) {
    return await Product.findById(id)
        .populate({
            path: 'owner',
            select: '-hashedPassword' // exclude hashedPassword
        });
}

async function update(existing, item) {
    console.log("existing");
    console.log(existing);
    console.log(typeof existing);
    existing.name = item.name;
    existing.description = item.description;
    existing.price = item.price;

    await existing.save();
    

    return existing;
}

// getByOwner
async function getByOwner(owner) {
    return Product.find({ owner }).populate({
        path: 'owner',
        select: '-hashedPassword' // exclude hashedPassword
    }).lean();
}

async function deleteById(id) {
    await Product.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    getByOwner,
    getByIdForEdit
};