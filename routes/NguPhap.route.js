//@ts-check
var express = require('express');
var router = express.Router();
const nguPhapController = require('../controllers/NguPhap.controller');

router.get('/', nguPhapController.layNguPhapPage);

module.exports = router;
