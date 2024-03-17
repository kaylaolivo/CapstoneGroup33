const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require("express");
const mongoose = require('mongoose');

const connectDB = require("./config/db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // Assuming User schema is in a "models" folder
const authRoutes = require("./routes/api/authRoutes"); // Import the new authRoutes file

const booksRoutes = require("./routes/api/books");
const coursesRoutes = require("./routes/api/courses");
const listingsRoutes = require("./routes/api/listings");
const majorRoutes = require("./routes/api/major");

const PlacesRoutes = require("./routes/api/Places");

const userRoutes = require("./routes/api/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");





const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", booksRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/major", majorRoutes);
app.use("/api/users", userRoutes);

//***************************************
app.post('/places', PlacesRoutes.createPlaces);
app.get('/places', PlacesRoutes.getPlaces);
//*************************************** */

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Connect Database
connectDB();
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
/*
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
*/
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});


console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET);

passport.use(new GoogleStrategy({
    //clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientID: '747956659288-ap20k71v2oip0p97d9fgg1ugvu21hj7t.apps.googleusercontent.com',
    //clientSecret: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,
    callbackURL: "http://localhost:8082/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },

  /*
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  */

  function(accessToken, refreshToken, profile, cb) {
    // Extract user details from the profile
    const { id, displayName } = profile;

    // Find or create the user in the database
    User.findOrCreate({ googleId: id }, { username: id, name: displayName }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    console.log("User logged in:", req.isAuthenticated());
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  }
);

app.get("/logout", function(req, res){
  res.redirect("http://localhost:3000/");
});


// Use the authRoutes as a middleware for /auth path
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));