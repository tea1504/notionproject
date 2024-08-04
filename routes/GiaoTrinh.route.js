var express = require('express');
var router = express.Router();
const giaoTrinhController = require('../controllers/GiaoTrinh.controller.js');


router.get('/tim-kiem', giaoTrinhController.timDanhSachGiaoTrinh);

module.exports = router;