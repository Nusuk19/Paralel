const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getAllVehicles);
router.put('/:id/status', controller.updateVehicleStatus);
module.exports = router;
