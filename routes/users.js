const express = require('express');
const router = express.Router();

//Create link to usersController
const usersController = require('../controllers/usersController');

//New User Route
router.get('/new', usersController.new);
router.post('/', usersController.create);

module.exports = router