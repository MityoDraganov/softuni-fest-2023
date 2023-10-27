require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Business = require('../models/Business');
const blacklist = require('../utils/verifySession').blacklist;

async function register(email, companyName, password) {
    const existing = await Business.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });

    if (existing) {
        throw new Error('Email already exists');
    }

    const business = new Business({
        email,
        companyName,
        hashedPassword: await bcrypt.hash(password, 10),
    });

    await business.save();

    return createSession(business);
}

async function login(email, password) {
    const business = await Business.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!business) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, business.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createSession(business);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(business) {
    return {
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

module.exports = {
    register,
    login,
    logout,
    blacklist,
    getAll,
};
