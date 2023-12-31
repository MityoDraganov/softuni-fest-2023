const Product = require('../models/Product');
const { createPrice, deletePrice } = require('./stripe');

async function getAll(page = 1, limit = 50) {
    // Calculate the skip value to paginate through the data
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find({})
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'owner',
                select: '-hashedPassword' // exclude hashedPassword
            })
            .lean();

        return products;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching products');
    }
}

async function getById(id) {
    return await Product.findById(id)
        .populate({
            path: 'owner',
            select: '-hashedPassword' // exclude hashedPassword
        });;
}

async function getByOwner(owner) {
    return Product.find({ owner }).populate({
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

    const result = new Product({ name, description, price, owner, priceId });
    await result.save();

    return result;
}

async function update(existing, item, subscription) {
    if (subscription) {
        const priceProd = await createPrice(item.name, item.description, item.price);
        existing.priceId = priceProd.id;
    } else {
        if (existing.priceId) {
            await deletePrice(existing.priceId);
        }
        existing.priceId = null;
    }
    existing.name = item.name;
    existing.description = item.description;
    existing.price = item.price;

    await existing.save();


    return existing;
}

async function deleteById(product) {
    if (product.priceId) {
        await deletePrice(product.priceId);
    }
    await Product.findByIdAndDelete(product._id);
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    getByOwner,
};