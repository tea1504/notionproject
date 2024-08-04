var express = require('express');
var router = express.Router();
const hanTuController = require('../controllers/HanTu.controller');


router.get('/tim-kiem', hanTuController.LayHanTuTuName);
router.get('/:id', hanTuController.layHanTuTuID);
router.get('/', hanTuController.layHanTuPage);

module.exports = router;