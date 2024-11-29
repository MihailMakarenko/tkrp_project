const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Location = sequelize.define("Location", {
  LocationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CorpsNumber: { type: DataTypes.SMALLINT, allowNull: false },
  HullNumber: { type: DataTypes.SMALLINT, allowNull: false },
  RoomNumber: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Location;
