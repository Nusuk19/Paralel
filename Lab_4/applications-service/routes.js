const express = require('express');
const router = express.Router();
const applicationsController = require('./controller');

// Отримати всі заявки
router.get('/', applicationsController.getAllApplications);

// Створити нову заявку
router.post('/', applicationsController.createApplication);

// Призначити водія та авто
router.put('/:id/assign', applicationsController.assignApplication);

// Завершити заявку
router.put('/:id/complete', applicationsController.completeApplication);

module.exports = router;
