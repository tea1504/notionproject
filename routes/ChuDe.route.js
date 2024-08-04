var express = require('express');
var router = express.Router();
const chuDeController = require('../controllers/ChuDe.controller');


router.get('/danh-sach', chuDeController.layDanhSachChuDe);

module.exports = router;
