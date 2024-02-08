const express = require('express');
const router = express.Router();

/* GET rooms listing. */
router.get('/', function (req, res, next) {
    res.send('get rooms ');
});

module.exports = router;
