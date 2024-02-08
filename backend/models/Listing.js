// models/Listing.js
//need to add images here


const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },


  //fix useri later!!!!!
  userid: {
    //type: mongoose.Schema.Types.ObjectId, // Assuming userid is of type ObjectId
    //ref: 'User' // Replace 'User' with the actual model name for user
    type: String,
    required:true
  },
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
  }
});

module.exports = Listing = mongoose.model('listing', ListingSchema);
