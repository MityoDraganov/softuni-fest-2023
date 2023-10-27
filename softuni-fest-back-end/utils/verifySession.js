require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const blacklist = [];
function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalidated');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.companyName) {
        return {
            email: payload.email,
            companyName: payload.companyName,
            _id: payload._id,
            token,
        };
    }else{
    return {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        _id: payload._id,
        token,
    }};
}

module.exports = {
    blacklist,
    verifySession,
};
