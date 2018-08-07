var express = require('express');
var router = express.Router();

// create a link to our drink model
var strainsController = require('../controllers/strainsController');

// index (http://my-app.com/strains)
router.get( '/', strainsController.index );

// new (http://my-app.com/strains/new)
router.get( '/new', strainsController.new );

// show (http://my-app.com/strains/12345)
router.get( '/:id', strainsController.show );

// edit (http://my-app.com/strains/12345/edit)
router.get( '/:id/edit', strainsController.edit );

// create (http://my-app.com/strains)
router.post( '/', strainsController.create );

// update (http://my-app.com/strains/12345)
router.post( '/:id', strainsController.update );

// delete (http://my-app.com/strains/12345/delete)
router.post( '/:id/delete', strainsController.delete );

// makes our file public to the application
module.exports = router;