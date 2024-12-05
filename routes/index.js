const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
    res.render('users');
});

router.get('/:userid/todos', function (req, res) {
    res.render('todos', { userid: req.params.userid });
});

module.exports = router;
