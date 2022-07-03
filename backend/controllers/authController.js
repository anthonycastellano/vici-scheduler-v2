const validateHelpers = require('../helpers/validateHelpers');

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
        return res.send('Success');
    }

    res.status(401);
    res.send('Bad credentials');
};