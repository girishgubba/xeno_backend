const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CommunicationLog = sequelize.define("CommunicationLog", {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("SENT", "FAILED"),
    defaultValue: "SENT"
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = CommunicationLog;
