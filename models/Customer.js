const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  totalSpent: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  visitCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastOrderDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Customer;
