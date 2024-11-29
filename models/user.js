// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  SecondName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  PhoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: [["admin", "user"]], // Проверка на допустимые значения добавь свои
    },
  },
  StatusNow: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = User;
// Метод для установки пароля
// User.prototype.setPassword = function (password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.Password = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//     .toString("hex");
// };

// // Метод для проверки пароля
// User.prototype.validatePassword = function (password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//     .toString("hex");
//   return this.Password === hash;
// };

// // Метод для генерации JWT
// User.prototype.generateJWT = function () {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   return jwt.sign(
//     {
//       email: this.Email,
//       id: this.UserId,
//       exp: parseInt(expirationDate.getTime() / 1000, 10),
//     },
//     "secret"
//   ); // Используйте более безопасный секрет в продакшене
// };

// // Метод для преобразования пользователя в JSON для аутентификации
// User.prototype.toAuthJSON = function () {
//   return {
//     UserId: this.UserId,
//     Email: this.Email,
//     token: this.generateJWT(),
//   };
// };
