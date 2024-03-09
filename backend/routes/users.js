const express = require('express');
const router = express.Router();
const {hash} = require('bcrypt');
const {v4: generateId} = require('uuid');
const {isValidText, isValidEmail} = require("../utils/validation");
const {createJSONToken, isValidPassword} = require("../utils/auth");
const { writeData} = require("../utils/file");
const {getAllUsersFromDatabase} = require("../utils/database");

const database = 'databases/users.json';

/* GET users listing. */
router.get('/all', async function (req, res, next) {
    console.log('get users');
    let storedData = await getAllUsersFromDatabase();
    res.json({users: storedData});
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
        return res.status(401).json({message: 'Authentication failed. User not Exist.'});
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
    let storedData = await getAllUsersFromDatabase();
    const userId = generateId();
    const hashedPw = await hash(data.password, 12);
    if (!storedData) {
        storedData = [];
    }
    storedData.push({...data, password: hashedPw, id: userId});
    await writeData(database, storedData);
    return {id: userId, email: data.email};
}

async function get(email) {
    let storedData = await getAllUsersFromDatabase();
    if (!storedData || storedData.length === 0) {
        throw new Error('Could not find any users.');
    }

    const user = storedData.find((ev) => ev.email === email);
    if (!user) {
        throw new Error('Could not find user for email ' + email);
    }

    return user;
}

module.exports = router;
