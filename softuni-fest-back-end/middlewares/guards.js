
function isBusiness() {
    return (req, res, next) => {
        if (req.user && req.business) {
            next();
        } else {
            res.status(401).json({ message: 'You are not a business owner!' });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.status(400).json({ message: 'You are already signed in' });
        }
    };
}

module.exports = {
    isGuest,
    isBusiness
};
