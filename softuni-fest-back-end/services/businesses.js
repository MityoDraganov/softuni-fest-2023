require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Business = require('../models/Business');
const { validatePassword } = require('../utils/util');
const blacklist = require('../utils/verifySession').blacklist;

async function register(email, companyName, password) {
    const existing = await Business.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });

    if (existing) {
        throw new Error('Email already exists');
    }
    if(!validatePassword(password)){
        throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number')
    }

    const business = new Business({
        email,
        companyName,
        hashedPassword: await bcrypt.hash(password, 10),
    });

    await business.save();

    return createBusinessSession(business);
}

function logout(token) {
    blacklist.push(token);
}

function createBusinessSession(business) {
    return {
        isBusiness: true,
        email: business.email,
        companyName: business.companyName,
        _id: business._id,
        accessToken: jwt.sign(
            {
                email: business.email,
                companyName: business.companyName,
                _id: business._id,
            },
            JWT_SECRET
        ),
    };
}

async function getAll() {

    return await Business.find({}).select('-hashedPassword -email -__v'); 

}

async function getBusinessById(id){
    return await Business.findById(id).select('-hashedPassword').populate('purchases.product');
}


module.exports = {
    register,
    logout,
    blacklist,
    getAll,
    getBusinessById,
};
