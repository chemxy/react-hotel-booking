const express = require('express');
const router = express.Router();
const {hash} = require('bcrypt');
const {v4: generateId} = require('uuid');
const {isValidText, isValidEmail} = require("../utils/validation");
const {createJSONToken, isValidPassword} = require("../utils/auth");
const fs = require("node:fs/promises");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('get users');
});

router.post('/signup', async (req, res, next) => {
    const data = req.body;
    let errors = {};

    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email.';
    } else {
        try {
            const existingUser = await get(data.email);
            if (existingUser) {
                errors.email = 'Email exists already.';
            }
        } catch (error) {
            console.log("error get user")
        }
    }

    if (!isValidText(data.password, 6)) {
        errors.password = 'Invalid password. Must be at least 6 characters long.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
    }

    try {
        const createdUser = await add(data);
        // const authToken = createJSONToken(createdUser.email);
        res
            .status(200)
            .json({message: 'User created.', user: createdUser});
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let user;
    try {
        user = await get(email);
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed.'});
    }

    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
        return res.status(422).json({
            message: 'Invalid credentials.',
            errors: {credentials: 'Invalid email or password entered.'},
        });
    }

    const token = createJSONToken(email);
    res.json({token});
});


async function add(data) {
    let storedData = await readData();
    const userId = generateId();
    const hashedPw = await hash(data.password, 12);
    if (!storedData) {
        storedData = [];
    }
    storedData.push({...data, password: hashedPw, id: userId, reservations: []});
    await writeData(storedData);
    return {id: userId, email: data.email};
}

async function get(email) {
    const storedData = await readData();
    if (!storedData || storedData.length === 0) {
        throw new Error('Could not find any users.');
    }

    const user = storedData.users.find((ev) => ev.email === email);
    if (!user) {
        throw new Error('Could not find user for email ' + email);
    }

    return user;
}

async function readData() {
    const data = await fs.readFile('databases/users.json', 'utf8');
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile('databases/users.json', JSON.stringify(data));
}

module.exports = router;
