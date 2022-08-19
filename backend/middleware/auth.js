const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const token = req.cookies['token'];

    try {
        jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send('Invalid or missing auth token');
    }

    return next();
};
