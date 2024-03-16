/*const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email:{type: String, unique: true, required : true}
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);

*/

const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const userSchema = new mongoose.Schema ({
  username: String,
  name: String,
  googleId: String,
  secret: String,
  major:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Major'
  },
  grad_year: Number
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema)
