const express = require('express');
const {writeData} = require("../utils/file");
const router = express.Router();
const {v4: generateId} = require('uuid');
const {isValidDate, isValidEmail} = require("../utils/validation");
const {getAllReservationsFromDatabase} = require("../utils/database");


const database = 'databases/reservations.json';


function filterReservationByDate(startDateString, endDateString, storedData) {
    let reservations = []

    if (isValidDate(startDateString) && isValidDate(endDateString)) {
        const startDate = Date.parse(startDateString);
        const endDate = Date.parse(endDateString);

        // filter based on date
        reservations = storedData.filter(item => Date.parse(item.endDate) >= startDate && Date.parse(item.startDate) <= endDate);

    } else {
        throw Error('invalid date')
    }

    return reservations;
}

function hideUSerInfo(reservations) {

    const res = reservations.map((item) => {
        return {...item, email: ""}
    });
    return res;
}

/* GET all reservation listing for a given date range */
router.get('/all', async function (req, res, next) {
    console.log("get all reservations")
    const startDate = req.query.startDate; //YYYY-MM-DD
    const endDate = req.query.endDate;//YYYY-MM-DD

    let storedData = await getAllReservationsFromDatabase();

    if (startDate && endDate) {
        try {
            let reservations = filterReservationByDate(startDate, endDate, storedData);
            return res.status(200).json({message: "ok", reservations: hideUSerInfo(reservations)});
        } catch (e) {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }

    return res.status(200).json({message: "ok", reservations: hideUSerInfo(storedData)});
});

/*get all reservations by room id and/or date range*/
router.get('/room', async function (req, res, next) {
    console.log("get reservations by room id");
    const roomId = req.query.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let storedData = await getAllReservationsFromDatabase();

    const reservationsForRoom = storedData.filter(item => item.roomId === roomId);

    if (startDate && endDate) {
        try {
            let reservations = filterReservationByDate(startDate, endDate, reservationsForRoom);
            return res.status(200).json({message: "ok", reservations: hideUSerInfo(reservations)});
        } catch (e) {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }

    return res.status(200).json({message: "ok", reservation: hideUSerInfo(reservationsForRoom)});

});

/* get all reservations by user email and/or date range*/
router.get('/user', async function (req, res, next) {
    console.log("get reservations by user email");
    const email = req.query.email;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!isValidEmail(email)) {
        return res.status(400).json({message: "please provide a valid email"});
    }

    let storedData = await getAllReservationsFromDatabase();
    const reservationsForUser = storedData.filter(item => item.email === email);

    if (startDate && endDate) {
        try {
            let reservations = filterReservationByDate(startDate, endDate, reservationsForUser);
            return res.status(200).json({message: "ok", reservations: hideUSerInfo(reservations)});
        } catch (e) {
            return res.status(400).json({message: "please provide a valid date range"});
        }
    }
    return res.status(200).json({message: "ok", reservation: hideUSerInfo(reservationsForUser)});


});

/* check if a room is available on a date*/
router.post('/available', async function (req, res, next) {
    const roomId = req.body.roomId;
    const date = req.body.date;

    let storedData = await getAllReservationsFromDatabase();
    const reservationsForRoom = storedData.filter(item => item.roomId === roomId);
    try {
        let reservations = filterReservationByDate(date, date, reservationsForRoom);
        return reservations.length === 0 ? res.status(200).json({message: "not found"}) : res.status(200).json({message: "found"});
    } catch (e) {
        return res.status(400).json({message: "please provide a valid date or room id"});
    }
})

/*create a reservation*/
router.post('/reserve', async function (req, res, next) {
    /*
    * room id
    * user email
    * start date
    * end date
    * */
    console.log("book a room")
    const roomId = req.body.roomId;
    const email = req.body.email;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    if (!isValidEmail(email)) {
        return res.status(400).json({message: "please provide a valid email"});
    }
    // const rooms = await getAllRoomsFromDatabase();
    // if(!rooms.find(item => item.roomId === roomId)){
    //     return res.status(400).json({message: "please provide a valid room id"});
    // }

    if (startDate && isValidDate(startDate) && endDate && isValidDate(endDate)) {
        let storedData = getAllReservationsFromDatabase();
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

module.exports = router;
