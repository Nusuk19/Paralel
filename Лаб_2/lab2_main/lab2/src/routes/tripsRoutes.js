const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

router.get('/', tripsController.getTrips);
router.get('/:id', tripsController.getTripById);
router.post('/', tripsController.addTrip);
router.put('/:id', tripsController.updateTrip);
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;
