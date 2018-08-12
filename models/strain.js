const mongoose = require( 'mongoose' );

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
    required: 'Please enter a cannabis type.'
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

module.exports = mongoose.model( 'Strain', StrainSchema );