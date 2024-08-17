//@ts-check
var express = require('express');
var router = express.Router();
const blockController = require('../controllers/Block.controller');

router.get('/tim-kiem', blockController.timKiemBlock);
router.post('/them', blockController.themBlock);
router.post('/cap-nhat', blockController.capNhatBlock);

module.exports = router;
