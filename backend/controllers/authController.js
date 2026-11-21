const validateHelpers = require('../helpers/validateHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const COOKIE_EXP_STR = '12h';
const COOKIE_EXP_MS = 43200000;
const IS_PROD = process.env.NODE_ENV === 'production';

// verify admin credentials and return jwt
exports.login = async (req, res) => {
    // sanitize body
    validateHelpers.sanitizeAuth(req.body);

    // validate body
    try {
        await validateHelpers.validateAuth(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    // constant-time bcrypt comparison against the stored hash
    const expectedHash = process.env.ADMIN_PASSWORD_HASH;
    const expectedUser = process.env.ADMIN_USERNAME;

    if (!expectedHash || !expectedUser) {
        // fail closed rather than allow an unconfigured login
        console.error('ADMIN_USERNAME / ADMIN_PASSWORD_HASH not configured');
        return res.status(500).send('Server configuration error');
    }

    // username is not a secret; the password check below is the sensitive one
    const userMatches = req.body.username === expectedUser;
    const passMatches = bcrypt.compareSync(
        typeof req.body.password === 'string' ? req.body.password : '',
        expectedHash
    );

    if (userMatches && passMatches) {
        const token = jwt.sign(
            { user_id: req.body.username },
            process.env.TOKEN_KEY,
            {
                expiresIn: COOKIE_EXP_STR
            }
        );

        return res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: IS_PROD,
                maxAge: COOKIE_EXP_MS
            })
            .send('Success');
    }

    res.status(401).send('Bad credentials');
};
