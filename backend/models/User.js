const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email:{type: String, unique: true, required : true},
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ]
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);