const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Customer = require("../models/Customer");

// POST /api/orders — Add a new order for a customer
router.post("/", async (req, res) => {
  try {
    const { customerId, amount, date } = req.body;

    const order = await Order.create({
      customerId,
      amount,
      date,
    });

    // Update customer stats
    const customer = await Customer.findByPk(customerId);
    customer.totalSpent += amount;
    customer.visitCount += 1;
    customer.lastOrderDate = date;
    await customer.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add order" });
  }
});

module.exports = router;
