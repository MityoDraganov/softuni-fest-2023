const { model, Schema } = require('mongoose');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const businessSchema = new Schema({
    companyName: { type: String, required: [true, 'Company name is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: email => emailRegex.test(email),
            message: 'Invalid email format'
        }
    },
    hashedPassword: { type: String, required: true },
    purchases: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            paidWith: { type: String},
            purchaseDate: { type: Date, default: Date.now }
        }
    ],
});

businessSchema.index(
    { email: 1 },
    {
        collation: {
            locale: 'en',
            strength: 1,
        },
    }
);

const Business  = model('Business', businessSchema);

module.exports = Business;
