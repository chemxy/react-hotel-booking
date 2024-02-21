const express = require('express');
const {readData, writeData} = require("../utils/file");
const router = express.Router();

const database = 'databases/reservations.json';

/* GET all reservation listing. */
router.get('/all', async function (req, res, next) {
    console.log("get all reservations")
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate && isValidDate(startDate) && endDate && isValidDate(endDate)) {

        let storedData = await readData(database);
        if (!storedData) {
            storedData = [];
        }
        return res.status(200).json({message: "ok", rooms: storedData});

    }
    return res.status(400).json({
        message: 'please provide a valid start date and end date'
    });
});

/*get reservation by id*/
router.get('/reservation', async function (req, res, next) {
    console.log("get room by id");
    const reservationId = req.query.id;

    let storedData = await readData(database);
    const reservation = storedData.find(item => item.id === reservationId);
    if (reservation)
        return res.status(200).json({message: "ok", reservation: reservation});
    else
        res.send('no reservation found ');
});

/*create a reservation*/
router.post('/reserve', async function (req, res, next) {
    /*
    * room id
    * start date
    * end date
    * */

    const roomId = req.body.roomId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    //TODO verify room id

    if (startDate && isValidDate(startDate) && endDate && isValidDate(endDate)) {
        let storedData = await readData(database);
        if (!storedData) {
            storedData = [];
        }
        storedData.push({...data, roomId: roomId, startDate: startDate, endDate: endDate});
        await writeData(database, storedData);
    }

    res.send('reserve a room ');
});

function isValidDate(dateString) {
    console.log(new Date(dateString));
    //TODO validate date format yyyy-mm-dd
    return true;
}

module.exports = router;
