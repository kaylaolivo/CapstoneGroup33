// models/Listing.js
//need to add images here


const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }, 
  condition:{
    type:String,
    required:false
  },
  price:{
    type: Number,
    required:false
  },
  pickup:{
    type: String,
    required:false
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  purchasedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  purchased:{
    type:Boolean, 
    required:true
  },

});

module.exports = Listing = mongoose.model('listing', ListingSchema);
