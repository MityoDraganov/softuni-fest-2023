const Product = require('../models/Product');


async function getAll() {
    return Product.find({});
}

async function create(name, description, price, owner) {
    const result = new Product({name, description, price, owner});
    await result.save();

    return result;
}

function getById(id) {
    return Product.findById(id);
}

async function update(existing, item) {
    existing.name = item.name;
    existing.description = item.description;
    existing.price = item.price;

    await existing.save();

    return existing;
}

// getByOwner
async function getByOwner(owner) {
    return Product.find({owner});
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
    getByOwner
};