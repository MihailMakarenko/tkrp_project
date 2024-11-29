const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Notification = sequelize.define("Notification", {
  NotificationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Message: { type: DataTypes.STRING(50), allowNull: false },
  DateTime: { type: DataTypes.DATE, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Notification;
