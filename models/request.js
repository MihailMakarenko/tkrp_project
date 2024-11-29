const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Request = sequelize.define("Request", {
  RequestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  RequestPriority: { type: DataTypes.STRING(50), allowNull: false },
  DateTime: { type: DataTypes.DATE, allowNull: false },
  RequestStatus: { type: DataTypes.STRING(50), allowNull: false },
  TaskId: { type: DataTypes.INTEGER, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Request;
