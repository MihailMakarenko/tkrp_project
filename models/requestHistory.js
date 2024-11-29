const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RequestHistory = sequelize.define("RequestHistory", {
  RequestHistoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RequestId: { type: DataTypes.INTEGER, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
  Description: { type: DataTypes.STRING(50), allowNull: false },
});

module.exports = RequestHistory;
