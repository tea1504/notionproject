var express = require('express');
var router = express.Router();
const capDoController = require('../controllers/CapDo.controller');


router.get('/danh-sach', capDoController.layDanhSachCapDo);

module.exports = router;