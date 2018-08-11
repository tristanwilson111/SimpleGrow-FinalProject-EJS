var Strain = require( '../models/strain' );

/* VIEWS */
//Index View Handle
exports.index = function( req, res, next ) {
  let locals = {
    title: 'Strains List',
    messages: req.session.messages || []
  };

  req.session.messages = []

  Strain.find()
  .then( function ( strains ) {
    locals.strains = strains;

    res.render( 'strains/index', locals )
  })
  .catch( function ( err ) {
    next( err )
  });
};

//Show View Handle
exports.show = function ( req, res, next ) {
  let locals = {
    title: 'Strain'
  };

  Strain.findById({
    _id: req.params.id
  })
  .then( function ( strain ) {
    locals.strain = strain;

    res.render( 'strains/show', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// New View Handle
exports.new = function ( req, res ) {
  let locals = {
    title: 'New Strain'
  };

  res.render( 'strains/new', locals )
};

// Edit View Handle
exports.edit = function ( req, res, next ) {
  let locals = {
    title: 'Edit Strain'
  };

  Strain.findById({
    _id: req.params.id
  })
  .then( function ( strain ) {
    locals.strain = strain;

    res.render( 'strains/edit', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

/* ACTIONS - Create, Update, Delete */
// Create 
exports.create = function ( req, res, next ) {
  // Image Handling
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  // Specifications
  let specifications = null
  if (req.body['specification[key]'] && req.body['specification[value]']) {
    //Assign field inputs to variables
    let spec_keys = req.body['specification[key]']
    let spec_values = req.body['specification[value]']
    
    //Assign empty array to specifications
    specifications =[]

    //If array, populate
    if ( spec_keys && Array.isArray( spec_keys ) ) {
      for (let i = 0; i < spec_keys.length; i++) {
        specifications.push( { key: spec_keys[i], value: spec_values[i] } )
      }
    } else { // Else, Populate String
      specifications.push( { key: spec_keys, value: spec_values } )
    }
  }

  //Strain.create function
  Strain.create({
    name: req.body.name,
    cannabisType: req.body.cannabisType,
    price: req.body.price,
    image: imageName,
    specifications: specifications
  })
  .then( function () {
    res.redirect( '/strains' )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// Update
exports.update = function ( req, res, next ) {
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }
  
  let specifications = null
  if (req.body['specification[key]'] && req.body['specification[value]']) {
    let spec_keys = req.body['specification[key]']
    let spec_values = req.body['specification[value]']
    
    specifications =[]

    if ( spec_keys && Array.isArray( spec_keys ) ) {
      for (let i = 0; i < spec_keys.length; i++) {
        specifications.push( { key: spec_keys[i], value: spec_values[i] } )
      }
    } else {
      specifications.push( { key: spec_keys, value: spec_values } )
    }
  }

  Strain.findById( req.params.id )
  .then(function ( strain ) {
    strain.name = req.body.name
    strain.cannabisType = req.body.cannabisType
    strain.price = req.body.price
    strain.image = imageName
    strain.specifications = specifications

    strain.save()
    .then(  function () {
      res.redirect( '/strains' )
    })
    .catch( function ( err ) {
      next( err )
    })
  })
  .catch(function ( err ) {
    next( err )
  })
};

// Delete
exports.delete = function ( req, res ) {
  Strain.remove({
    _id: req.body.id
  })
  .then( function () {
    res.redirect( '/strains' )
  })
  .catch( function ( err ) {
    next( err )
  })
};