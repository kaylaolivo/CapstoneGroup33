// models/Places.js 

const mongoose =require('mongoose');

const placesSchema = new mongoose.Schema({
    name: {type:String, required:true},

    location: {type:String, required:true},

    zip:{type:String,required:true}

})

module.exports = mongoose.model('Places',placesSchema);