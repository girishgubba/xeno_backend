const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Campaign, Customer, CommunicationLog } = require("../models");

// POST /api/campaigns — Create a campaign and send messages
router.post("/", async (req, res) => {
  try {
    const { name, rules } = req.body;

    // Build dynamic filters
    const where = {};

    if (rules.totalSpent) {
      where.totalSpent = {
        [Op[rules.totalSpent.operator]]: rules.totalSpent.value
      };
    }

    if (rules.visitCount) {
      where.visitCount = {
        [Op[rules.visitCount.operator]]: rules.visitCount.value
      };
    }

    // Find matching customers
    const matchedCustomers = await Customer.findAll({ where });
    const audienceSize = matchedCustomers.length;

    // Create campaign record
    const campaign = await Campaign.create({
      name,
      segmentRules: rules,
      audienceSize
    });

    // Simulate message delivery and log it
    for (const user of matchedCustomers) {
      const isSent = Math.random() < 0.9; // 90% success
      const status = isSent ? "SENT" : "FAILED";

      await CommunicationLog.create({
        customerId: user.id,
        campaignId: campaign.id,
        status,
        message: `Hi ${user.name}, here’s 10% off on your next order!`
      });
    }

    res.status(201).json({
      message: "Campaign created and messages sent",
      campaign,
      audience: matchedCustomers
    });
  } catch (error) {
    console.error("Campaign creation error:", error);
    res.status(500).json({ message: "Failed to create campaign" });
  }
});

// GET /api/campaigns — Get campaign history with delivery stats
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      order: [["createdAt", "DESC"]]
    });

    const data = await Promise.all(
      campaigns.map(async (camp) => {
        const sent = await CommunicationLog.count({
          where: { campaignId: camp.id, status: "SENT" }
        });

        const failed = await CommunicationLog.count({
          where: { campaignId: camp.id, status: "FAILED" }
        });

        return {
          id: camp.id,
          name: camp.name,
          audienceSize: camp.audienceSize,
          sentCount: sent,
          failedCount: failed,
          createdAt: camp.createdAt
        };
      })
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching campaign history:", err);
    res.status(500).json({ message: "Error loading campaign history" });
  }
});

module.exports = router;
