const { model, Schema } = require('mongoose');

const businessSchema = new Schema({
    companyName: { type: String, required: [true, 'Company name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    hashedPassword: { type: String, required: true },
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

const Business  = model('Business ', businessSchema);

module.exports = Business;
