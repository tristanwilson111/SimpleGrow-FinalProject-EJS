var express = require('express');
var router = express.Router();

//Create a link to our strain controller
var strainsController = require('../controllers/strainsController');

//Index (http://my-app.com/strains)
router.get( '/', strainsController.index );

//New (http://my-app.com/strains/new)
router.get( '/new', strainsController.new );

//Show (http://my-app.com/strains/12345)
router.get( '/:id', strainsController.show );

//Edit (http://my-app.com/strains/12345/edit)
router.get( '/:id/edit', strainsController.edit );

//Create (http://my-app.com/strains)
router.post( '/', strainsController.create );

//Update (http://my-app.com/strains/12345)
router.post( '/:id', strainsController.update );

//Delete (http://my-app.com/strains/12345/delete)
router.post( '/:id/delete', strainsController.delete );

module.exports = router;