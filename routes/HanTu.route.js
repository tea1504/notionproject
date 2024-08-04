var express = require('express');
var router = express.Router();
const hanTuController = require('../controllers/HanTu.controller');


router.post('/cap-nhat', hanTuController.capNhatHanTu);
router.get('/tim-kiem', hanTuController.layHanTuTuName);
router.get('/:id', hanTuController.layHanTuTuID);
router.get('/', hanTuController.layHanTuPage);

module.exports = router;