const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // Assuming User schema is in a "models" folder
const authRoutes = require("./routes/api/authRoutes"); // Import the new authRoutes file

const booksRoutes = require("./routes/api/books");
const coursesRoutes = require("./routes/api/courses");
const listingsRoutes = require("./routes/api/listings");
const cors = require("cors");
const bodyParser = require("body-parser");


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
// Connect Database
connectDB();
app.use(passport.initialize());
app.use(passport.session());


// Passport Google Strategy
passport.use(
    new GoogleStrategy(
      {
        clientID: "747956659288-ap20k71v2oip0p97d9fgg1ugvu21hj7t.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8082/auth/google/callback", // Adjust the URL accordingly
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          // Add other fields as needed
        };
  
        try {
          let user = await User.findOne({ googleId: profile.id });
  
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  
  // Use the authRoutes as a middleware for /auth path
  app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`)); 





//*************************** Yiran diliminator --for testing, Dont delete those comments, ty!!!
/*const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./routes/api/Places'); // This should be the correct relative path

const app = express();

app.use(bodyParser.json());



app.post('/places', mongoPractice.createPlaces);
app.get('/places',mongoPractice.getPlaces);
app.listen(8082);
*/




