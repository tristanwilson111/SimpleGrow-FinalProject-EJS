const express = require('express');
const router = express.Router();

//Create link to usersController
const usersController = require('../controllers/usersController');

//New Route
router.get('/new', usersController.new);
router.post('/', usersController.create);
//Edit Route
// router.get('/edit', usersController.edit);
// router.post('/', usersController.edit);

// //Update Route
// router.get('/update', usersController.update);
// router.post('/', usersController.update);

// //Delete Route
// router.get('/delete', usersController.delete);
// router.post('/', usersController.delete);

module.exports = router