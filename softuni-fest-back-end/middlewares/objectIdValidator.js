const { ObjectId } = require('mongoose').Types;

module.exports = () => (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
    }
    next();
}
