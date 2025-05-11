const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// POST /api/customers — Add a new customer
router.post("/", async (req, res) => {
  try {
    const { name, email, totalSpent, visitCount, lastOrderDate } = req.body;

    const customer = await Customer.create({
      name,
      email,
      totalSpent,
      visitCount,
      lastOrderDate,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add customer" });
  }
});

module.exports = router;
