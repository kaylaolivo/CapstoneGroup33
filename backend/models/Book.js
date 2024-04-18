  // models/Book.js

  const mongoose = require('mongoose');

  const bookSchema = new mongoose.Schema ({
    title: String,
    author: String,
    genre: String,
    description: String,
    image: String, // Storing image URL or file path
    isbn: String,
    publicationYear: Number,
    language: String,
    pageCount: Number,
    publisher: String,
    courseName: {type: mongoose.Schema.Types.ObjectId},
  }); 

  module.exports = mongoose.model("Book", bookSchema);

