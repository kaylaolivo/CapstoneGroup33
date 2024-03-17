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
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  pickup:{
    type: Boolean,
    required:true
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  purchasedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  image:{
    type:String
  }
});

module.exports = Listing = mongoose.model('listing', ListingSchema);
