var express = require('express');
var router = express.Router();
const tuVungController = require('../controllers/TuVung.controller');

router.get('/', tuVungController.layTuVungPage);
router.get('/chi-tiet', tuVungController.layTuVungPageChiTiet);

module.exports = router;
