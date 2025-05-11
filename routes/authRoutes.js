const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000"); // React frontend
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out");
  });
});

// Check login status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

module.exports = router;
