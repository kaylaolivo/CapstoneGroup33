const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to the home page or wherever you want
    res.redirect("/");
  }
);

module.exports = router;
