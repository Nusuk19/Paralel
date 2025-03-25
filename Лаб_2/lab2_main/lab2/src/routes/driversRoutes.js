const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');

router.get('/', driversController.getDrivers);
router.get('/:id', driversController.getDriverById);
router.post('/', driversController.addDriver);
router.put('/:id', driversController.updateDriver);
router.delete('/:id', driversController.deleteDriver);

module.exports = router;
