const validateHelpers = require('../helpers/validateHelpers');
const jwt = require('jsonwebtoken');

// verify admin credentials and return jwt
exports.login = async (req, res) => {
    // sanitize body
    validateHelpers.sanitizeAuth(req.body);

    // validate body
    try {
        await validateHelpers.validateAuth(req.body);
    } catch (e) {
        res.status(400);
        e[0].error = 'Validation failed';
        return res.send(e);
    }

    // b64 encode auth credentials
    const creds = `${req.body.username}:${req.body.password}`;
    const credsBuff = Buffer.from(creds);
    const b64Creds = credsBuff.toString('base64');

    // compare to env admin password
    if (process.env.ADMIN_CREDS_B64 === b64Creds) {
        const token = jwt.sign(
            { user_id: req.body.username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h"
            }
        );

        return res.status(200).json(token);
    }

    res.status(401).send('Bad credentials');
};