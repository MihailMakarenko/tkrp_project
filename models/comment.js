const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Comment = sequelize.define("Comment", {
  CommentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Text: { type: DataTypes.STRING(1000), allowNull: false },
  DateTime: { type: DataTypes.DATE, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
  RequestId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Comment;
