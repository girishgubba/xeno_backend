const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Campaign = sequelize.define("Campaign", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segmentRules: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  audienceSize: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Campaign;
