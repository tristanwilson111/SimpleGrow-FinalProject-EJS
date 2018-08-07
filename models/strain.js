const mongoose = require( 'mongoose' );

// all model classes will inherit from 
// the mongoose.Schema class
const SpecificationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: 'You must have a key.'
  },
  value: {
    type: String,
    required: 'You must have a value.'
  }
});

const StrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a strain name.'
  },
  cannabisType: {
    type: String,
    required: 'Please enter a strain cannabisType.'
  },
  price: {
    type: Number,
    required: 'Please enter an MSRP value.'
  },
  specifications: [SpecificationSchema],
  image: {
    type: String
  }
});

// make this class public
module.exports = mongoose.model( 'Strain', StrainSchema );