const express = require('express');
const {readData} = require("../utils/file");
const router = express.Router();

const database = 'databases/rooms.json';

/* GET rooms listing. */
router.get('/all', async function (req, res, next) {
    console.log("get all rooms")

    let storedData = await readData(database);
    if (!storedData) {
        storedData = [];
    }
    return res.status(200).json({message: "ok", rooms: storedData});

});

router.get('/room', async function (req, res, next) {
    console.log("get room by id");
    const roomId = req.query.id;

    let storedData = await readData(database);
    const room = storedData.find(item => item.id === roomId);
    if (room)
        return res.status(200).json({message: "ok", room: room});
    else
        res.send('no room found ');
});

router.post('/reserve', function (req, res, next) {
    res.send('reserve a room ');
});

module.exports = router;
