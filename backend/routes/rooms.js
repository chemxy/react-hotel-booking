const express = require('express');
const router = express.Router();

/* GET rooms listing. */
router.get('/all', function (req, res, next) {
    res.send('get all rooms ');
});

router.get('/room', function (req, res, next) {
    res.send('get room by id ');
});

router.post('/reserve', function (req, res, next) {
    res.send('reserve a room ');
});


module.exports = router;
