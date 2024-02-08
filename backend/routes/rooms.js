var express = require('express');
var router = express.Router();

/* GET rooms listing. */
router.get('/', function (req, res, next) {
    res.send('get rooms ');
});

module.exports = router;
