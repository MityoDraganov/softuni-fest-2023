const { model, Schema } = require('mongoose');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: email => emailRegex.test(email),
            message: 'Invalid email format'
        }
    },
    firstName: { type: String, required: [true, 'Name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    hashedPassword: { type: String, required: true },
    purchases: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            paidWith: { type: String } 
        }
    ]
});

userSchema.index(
    { email: 1 },
    {
        collation: {
            locale: 'en',
            strength: 1,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
