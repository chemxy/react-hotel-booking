const express = require('express');
const router = express.Router();
const {v4: generateId} = require('uuid');
const {isValidDate, isValidEmail} = require("../utils/validation");
const {getAllReservations, insertReservation} = require("../utils/database");

function filterReservationByDate(startDateString, endDateString, storedData) {
    let reservations = []

    if (isValidDate(startDateString) && isValidDate(endDateString)) {
        const startDate = Date.parse(startDateString);
        const endDate = Date.parse(endDateString);

        // filter based on date
        reservations = storedData.filter(item => Date.parse(item.enddate) >= startDate && Date.parse(item.startdate) <= endDate);

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

    let storedData = await getAllReservations();

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

    let storedData = await getAllReservations();

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

    let storedData = await getAllReservations();
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
router.get('/available', async function (req, res, next) {
    const roomId = req.query.roomId;
    const date = req.query.date;

    let storedData = await getAllReservations();
    const reservationsForRoom = storedData.filter(item => item.roomid == roomId);
    try {
        let reservations = filterReservationByDate(date, date, reservationsForRoom);
        return reservations.length === 0 ? res.status(200).json({message: "not found"}) : res.status(200).json({message: "found"});
    } catch (e) {
        return res.status(400).json({message: "please provide a valid date or room id"});
    }
})

/*create a reservation*/
router.post('/reserve', async function (req, res, next) {

    console.log("book a room")
    const roomId = req.body.roomId;
    const userId = req.body.userId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    //TODO check if the time has already been booked

    // const rooms = await getAllRoomsFromDatabase();
    // if(!rooms.find(item => item.roomId === roomId)){
    //     return res.status(400).json({message: "please provide a valid room id"});
    // }

    if (startDate && isValidDate(startDate) && endDate && isValidDate(endDate)) {
        const reservationId = generateId();

        try {
            await insertReservation(reservationId, startDate, endDate, userId, roomId);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "error insert reservation"});
        }
    }

    return res.status(200).json({message: "room booked"});
});

module.exports = router;
