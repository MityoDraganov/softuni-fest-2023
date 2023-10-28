require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');
const { validatePassword } = require('../utils/util');
const Business = require('../models/Business');
const blacklist = require('../utils/verifySession').blacklist;

async function register(email, firstName, lastName, password) {
    const existing = await User.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });

    if (existing) {
        throw new Error('Email already exists');
    }

    if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number')
    }

    const user = new User({
        email,
        firstName,
        lastName,
        hashedPassword: await bcrypt.hash(password, 10),
    });

    await user.save();

    return createUserSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    const business = await Business.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user && !business) {
        throw new Error('Incorrect email or password');
    }
    if (user) {
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
            throw new Error('Incorrect email or password');
        }
    } else if (business) {
        const match = await bcrypt.compare(password, business.hashedPassword);
        if (!match) {
            throw new Error('Incorrect email or password');
        }
    }
    if(user){
        return createUserSession(user);
    }else if(business){
        return createBusinessSession(business);
    }
}

function logout(token) {
    blacklist.push(token);
}

function createUserSession(user) {
    return {
        isBusiness: false,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        accessToken: jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            },
            JWT_SECRET
        ),
    };
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

function getAll() {
    return User.find({}).select('-hashedPassword');
}

async function getUserById(id){
    return await User.findById(id).select('-hashedPassword').populate('purchases');
}



module.exports = {
    register,
    login,
    logout,
    blacklist,
    getAll,
    getUserById
};
