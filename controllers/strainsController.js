var Strain = require( '../models/strain' );

/* VIEWS */
// Index
exports.index = function( req, res, next ) {
  // create our locals parameter
  let locals = {
    title: 'Strains List',
    messages: req.session.messages || []
  };

  req.session.messages = []

  Strain.find()
  .then( function ( strains ) {
    // add the strains to our locals
    locals.strains = strains;

    // render our view
    res.render( 'strains/index', locals )
  })
  .catch( function ( err ) {
    next( err )
  });
};

// Show
exports.show = function ( req, res, next ) {
  // locals
  let locals = {
    title: 'Strain'
  };

  Strain.findById({
    _id: req.params.id
  })
  .then( function ( strain ) {
    // add the strains to our locals
    locals.strain = strain;

    // render our view
    res.render( 'strains/show', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// New
exports.new = function ( req, res ) {
  // locals
  let locals = {
    title: 'New Strain'
  };

  res.render( 'strains/new', locals )
};

// Edit
exports.edit = function ( req, res, next ) {
  // locals
  let locals = {
    title: 'Edit Strain'
  };

  Strain.findById({
    _id: req.params.id
  })
  .then( function ( strain ) {
    // add the strains to our locals
    locals.strain = strain;

    // render our view
    res.render( 'strains/edit', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

/* ACTIONS */
// Create 
exports.create = function ( req, res, next ) {
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  // specifications
  let specifications = null
  if (req.body['specification[key]'] && req.body['specification[value]']) {
    // assign our fields results to variables
    let spec_keys = req.body['specification[key]']
    let spec_values = req.body['specification[value]']
    
    // assign an empty array to specfications
    specifications =[]

    // populate if an array
    if ( spec_keys && Array.isArray( spec_keys ) ) {
      for (let i = 0; i < spec_keys.length; i++) {
        specifications.push( { key: spec_keys[i], value: spec_values[i] } )
      }
    } else {
      // populate if a string
      specifications.push( { key: spec_keys, value: spec_values } )
    }
  }

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
  // images
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }
  
  // specifications
  let specifications = null
  if (req.body['specification[key]'] && req.body['specification[value]']) {
    // assign our fields results to variables
    let spec_keys = req.body['specification[key]']
    let spec_values = req.body['specification[value]']
    
    // assign an empty array to specfications
    specifications =[]

    // populate if an array
    if ( spec_keys && Array.isArray( spec_keys ) ) {
      for (let i = 0; i < spec_keys.length; i++) {
        specifications.push( { key: spec_keys[i], value: spec_values[i] } )
      }
    } else {
      // populate if a string
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