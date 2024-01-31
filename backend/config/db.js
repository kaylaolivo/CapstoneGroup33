// db.js

const mongoose = require("mongoose");
const db =
  "mongodb+srv://keo76:39DGniD6B6j6Z7QO@cluster0.og9ozv7.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;