const Product = require('../models/Product');
const { createPrice, deletePrice } = require('./stripe');


async function getAll() {
    return Product.find({})
        .populate({
            path: 'owner',
            select: '-hashedPassword' // exclude hashedPassword
        }).lean();
}

async function create(name, description, price, owner, subscription) {
    let priceProd; // Define the price variable here

    if (subscription) {
        priceProd = await createPrice(name, description, price); // Use the correct variable name
    }
    const priceId = priceProd ? priceProd.id : null;

    const result = new Product({ name, description, price, owner, priceId});
    await result.save();

    return result;
}


async function getById(id) {
    try {
        const product = await Product.findById(id)
            .populate({
                path: 'owner',
                select: '-hashedPassword' // exclude hashedPassword
            });

        if (!product) {
            // Handle the case where the product with the given ID doesn't exist
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        throw error; // Rethrow the error to be handled at a higher level
    }
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
    return Product.find({ owner }).populate({
        path: 'owner',
        select: '-hashedPassword' // exclude hashedPassword
    }).lean();
}

async function deleteById(id) {
    const product = await getById(id);
    if(!product) throw new Error("No product found");
    if(product.priceId){
        await deletePrice(product.priceId);
    }
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