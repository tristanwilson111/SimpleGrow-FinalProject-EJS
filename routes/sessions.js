const express = require('express');
const router = express.Router();

//Create link to sessionsController
const sessionsController = require('../controllers/sessionsController');

//Session Routes
router.get('/new', sessionsController.new);
router.post('/', sessionsController.create);
router.get('/delete', sessionsController.delete);

module.exports = router