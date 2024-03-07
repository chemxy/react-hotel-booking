const express = require('express');
const {readData} = require("../utils/file");
const router = express.Router();

const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:2333@localhost:5432/reactdb');

const database = 'databases/rooms.json';

const getAllRoomsQuery = 'SELECT * from rooms;';

async function getAllRoomsFromDatabase() {
    // let storedData = await readData(database);
    // if (!storedData) {
    //     storedData = [];
    // }
    // return storedData;

    let result;
    await db.any(getAllRoomsQuery)
        .then((data) => {
            console.log('DATA:', data)
            result = data;
        })
        .catch((error) => {
            console.log('ERROR:', error)
            throw Error(error);
        })
    return result;
}

/* GET all rooms */
router.get('/all', async function (req, res, next) {
    console.log("get all rooms")
    let storedData;
    try {
        storedData = await getAllRoomsFromDatabase();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message: "ok", rooms: storedData});

});

/*get room by room id*/
router.get('/room', async function (req, res, next) {
    console.log("get room by id");
    const roomId = req.query.id;

    let storedData = await getAllRoomsFromDatabase();
    const room = storedData.find(item => item.id === roomId);
    if (room)
        return res.status(200).json({message: "ok", room: room});
    else
        res.send('no room found ');
});

exports.getAllRoomsFromDatabase = getAllRoomsFromDatabase;

module.exports = router;
