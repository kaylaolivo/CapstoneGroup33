const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = Major = mongoose.model('major', MajorSchema);