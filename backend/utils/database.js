const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:2333@localhost:5432/reactdb');

const getAllUsersQuery = 'SELECT * from users;';
const getAllRoomsQuery = 'SELECT * from rooms;';
const getAllReservationsQuery = 'SELECT * from reservations;';

async function getAllUsersFromDatabase() {

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

async function getAllReservationsFromDatabase() {
    // let storedData = await readData(database);
    // if (!storedData) {
    //     storedData = [];
    // }
    // return storedData;

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

exports.getAllRoomsFromDatabase = getAllRoomsFromDatabase;
exports.getAllReservationsFromDatabase = getAllReservationsFromDatabase;