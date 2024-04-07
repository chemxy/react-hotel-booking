const express = require('express');
const {getAllRooms} = require("../utils/database");
const {checkAuthMiddleware} = require("../utils/auth");
const router = express.Router();

/* GET all rooms */
router.get('/all', async function (req, res, next) {
    console.log("get all rooms")
    let storedData;
    try {
        storedData = await getAllRooms();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message: "ok", rooms: storedData});

});

/*get room by room id*/
router.get('/room', async function (req, res, next) {
    console.log("get room by id");
    const roomId = req.query.id;

    let storedData;
    try {
        storedData = await getAllRooms();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
    const room = storedData.find(item => item.id === roomId);
    if (room)
        return res.status(200).json({message: "ok", room: room});
    else
        res.send('no room found ');
});

module.exports = router;
