const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) return res.status(403).send('Missing auth token');

    try {
        jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send('Invalid auth token');
    }

    delete req.body.token; // not needed after authentication

    return next();
};
