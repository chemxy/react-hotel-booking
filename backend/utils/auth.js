const {sign, verify} = require('jsonwebtoken');
const {compare} = require('bcrypt');

const KEY = 'supersecret';

function createJSONToken(email) {
    return sign({email}, KEY, {expiresIn: '1h'});
}

function validateJSONToken(token) {
    return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING.');
        return res.status(401).json({error: "NOT AUTH. AUTH HEADER INVALID."});
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        // return next(new NotAuthError('Not authenticated.'));
        return res.status(401).json({error: "NOT AUTH. AUTH HEADER INVALID."});
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.');
        return res.status(401).json({error: "NOT AUTH. AUTH HEADER INVALID."});
    }
    next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuthMiddleware = checkAuthMiddleware;
