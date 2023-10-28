const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true },
    owner: { type: ObjectId, ref: 'Business' },
    priceId: { type: String },
});

const Product = model('Product', schema);

module.exports = Product;