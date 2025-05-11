const Customer = require("./Customer");
const Order = require("./Order");
const Campaign = require("./Campaign");
const CommunicationLog = require("./CommunicationLog");

// Set up associations
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

Customer.hasMany(CommunicationLog, { foreignKey: "customerId" });
Campaign.hasMany(CommunicationLog, { foreignKey: "campaignId" });

CommunicationLog.belongsTo(Customer, { foreignKey: "customerId" });
CommunicationLog.belongsTo(Campaign, { foreignKey: "campaignId" });

module.exports = {
  Customer,
  Order,
  Campaign,
  CommunicationLog
};
