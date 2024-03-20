const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:2333@localhost:5432/reactdb');

const getAllUsersQuery = 'SELECT * from users;';
// const getAvailableRoomsByDates = `select * from rooms where not exists (select roomid from reservations where rooms.roomid = reservations.roomid and reservations.startdate >= Date('${startDate}'));`;
const insertUSerQuery = 'INSERT INTO users VALUES(${id}, ${email}, ${name}, ${password});';
const getAllRoomsQuery = 'SELECT * from rooms;';
const getAllReservationsQuery = 'SELECT * from reservations;';
const insertReservationQuery = 'INSERT INTO reservations VALUES(${id}, ${startDate}, ${endDate}, ${userId}, ${roomId});';

async function getAllUsers() {

    let result;
    await db.any(getAllUsersQuery)
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

async function insertUser(user) {

    await db.none(insertUSerQuery, {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password
    })
}


async function getAllRooms() {
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

async function getAllReservations() {
    let result;
    await db.any(getAllReservationsQuery)
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

async function insertReservation(id, startDate, endDate, userId, roomId) {
    await db.none(insertReservationQuery, {
        id: id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: userId,
        roomId: roomId
    })
}

exports.getAllUsers = getAllUsers;
exports.getAllRooms = getAllRooms;
exports.getAllReservations = getAllReservations;
exports.insertReservation = insertReservation;
exports.insertUser = insertUser;