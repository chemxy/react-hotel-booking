const express = require('express');
const {readData, writeData} = require("../utils/file");
const router = express.Router();
const {v4: generateId} = require('uuid');

const database = 'databases/reservations.json';

/* GET all reservation listing for a given date range */
router.get('/all', async function (req, res, next) {
    console.log("get all reservations")
    const startDate = req.query.startDate; //YYYY-MM-DD
    const endDate = req.query.endDate;//YYYY-MM-DD

    let storedData = await readData(database);
    if (!storedData) {
        storedData = [];
    }

    if (startDate && endDate) {
        if (isValidDate(startDate) && isValidDate(endDate)) {

            //TODO filter based on date
            return res.status(200).json({message: "ok", reservations: reservations}); //TODO hide user email

        } else {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }

    return res.status(200).json({message: "ok", reservations: storedData});
});

/*get all reservations by room id and/or date range*/
router.get('/room', async function (req, res, next) {
    console.log("get reservations by room id");
    const roomId = req.query.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let storedData = await readData(database);
    const reservations = storedData.filter(item => item.roomId === roomId);


    if (startDate && endDate) {
        if (isValidDate(startDate) && isValidDate(endDate)) {
            //TODO filter based on date
        } else {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }

    return res.status(200).json({message: "ok", reservation: reservations}); //TODO hide user email

});

/*TODO get all reservations by user email and/or date range*/
router.get('/user', async function (req, res, next) {
    console.log("get reservations by user email");
    const email = req.query.email;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let storedData = await readData(database);
    const reservations = storedData.filter(item => item.email === email);


    if (startDate && endDate) {
        if (isValidDate(startDate) && isValidDate(endDate)) {
            //TODO filter based on date
        } else {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }
    return res.status(200).json({message: "ok", reservation: reservations}); //TODO hide user email


});

/*create a reservation*/
router.post('/reserve', async function (req, res, next) {
    /*
    * room id
    * start date
    * end date
    * */
    console.log("book a room")
    const roomId = req.body.roomId;
    const email = req.body.email;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    //TODO verify room id & user email

    if (startDate && isValidDate(startDate) && endDate && isValidDate(endDate)) {
        let storedData = await readData(database);
        if (!storedData) {
            storedData = [];
        }
        const reservationId = generateId();

        storedData.push({
            reservationId: reservationId,
            email: email,
            roomId: roomId,
            startDate: startDate,
            endDate: endDate
        });
        await writeData(database, storedData);
    }

    return res.status(200).json({message: "room booked"});
});



function isValidDate(dateString) {
    console.log(new Date(dateString));
    //TODO validate date format yyyy-mm-dd

    return true;
}

module.exports = router;
