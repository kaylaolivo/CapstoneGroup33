const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User"); // Import your User model

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // Successful authentication, redirect to the home page or wherever you want

    // Extract user information from the authentication process
    const { id, displayName, emails } = req.user;

    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ googleId: id });

      if (existingUser) {
        // User already exists, redirect to the home page or wherever you want
        return res.redirect("/");
      }

      // Create a new user entry in the database
      const newUser = new User({
        googleId: id,
        displayName,
        // You can add more fields as needed based on your User model
      });

      await newUser.save();

      // Redirect to the home page or wherever you want
      res.redirect("/");
    } catch (error) {
      // Handle error appropriately (e.g., log it or show an error page)
      console.error(error);
      res.redirect("/");
    }
  }
);

module.exports = router;
