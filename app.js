const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

// Load env variables
dotenv.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Session middleware (for Google OAuth or future use)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport (for OAuth later)
app.use(passport.initialize());
app.use(passport.session());

// Database connection and models
const sequelize = require("./config/db");
const { Customer, Order, Campaign } = require("./models");

// Sync DB
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
  })
  .catch((err) => {
    console.error("❌ DB sync error:", err);
  });

// Base route
app.get("/", (req, res) => {
  res.send("Xeno CRM Backend Running");
});

// API Routes
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const campaignRoutes = require("./routes/CampaignRoutes.js");
require("./config/passport");
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
