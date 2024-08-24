var express = require('express');
var router = express.Router();
const giaoTrinhController = require('../controllers/GiaoTrinh.controller.js');


router.get('/tim-kiem', giaoTrinhController.timDanhSachGiaoTrinhPage);
router.post('/tim-kiem', giaoTrinhController.timDanhSachGiaoTrinhTheoCha);

module.exports = router;