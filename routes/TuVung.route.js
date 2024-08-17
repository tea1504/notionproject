var express = require('express');
var router = express.Router();
const tuVungController = require('../controllers/TuVung.controller');

router.get('/', tuVungController.layTuVungPage);
router.get('/chi-tiet', tuVungController.layTuVungPageChiTiet);
router.get('/tim-kiem', tuVungController.timKiemTuVung);
router.get('/flowchart', tuVungController.layTuVungPageFlowChart);

module.exports = router;
