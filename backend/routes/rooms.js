const express = require('express');
const router = express.Router();

/* GET rooms listing. */
router.get('/all', function (req, res, next) {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate && endDate) {

    } else {
        return res.status(400).json({
            message: 'please provide start date and end date'
        });
    }
});

router.get('/room', function (req, res, next) {
    res.send('get room by id ');
});

router.post('/reserve', function (req, res, next) {
    res.send('reserve a room ');
});


module.exports = router;
