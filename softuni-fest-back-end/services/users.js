const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'asoiducan93284c9rew';
const blacklist = [];

async function register(email, firstName, lastName, password) {
    const existing = await User.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });

    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new User({
        email,
        firstName,
        lastName,
        hashedPassword: await bcrypt.hash(password, 10),
    });

    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(user) {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        accessToken: jwt.sign(
            {
                email: user.email,
                _id: user._id,
            },
            JWT_SECRET
        ),
    };
}

function getAll() {
    return User.find({}).select('-hashedPassword');
}

module.exports = {
    register,
    login,
    logout,
    blacklist,
    getAll,
};
