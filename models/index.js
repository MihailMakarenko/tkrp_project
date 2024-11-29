// Импорт моделей
const sequelize = require("../db");
const Comment = require("./comment");
const HistoryUser = require("./historyUser");
const Location = require("./location");
const Notification = require("./notification");
const Request = require("./request");
const RequestHistory = require("./requestHistory");
const Task = require("./task");
const User = require("./user");

// Установите связи между моделями

// User can create many Comments
User.hasMany(Comment, { foreignKey: "UserId" });
Comment.belongsTo(User, { foreignKey: "UserId" });

// User can create many Requests
User.hasMany(Request, { foreignKey: "UserId" });
Request.belongsTo(User, { foreignKey: "UserId" });

// User can change many HistoryUsers
User.hasMany(HistoryUser, { foreignKey: "AdminUserID" });
HistoryUser.belongsTo(User, { foreignKey: "AdminUserID" });

// User can have many Notifications
User.hasMany(Notification, { foreignKey: "UserId" });
Notification.belongsTo(User, { foreignKey: "UserId" });

// Request can have many Comments
Request.hasMany(Comment, { foreignKey: "RequestId" });
Comment.belongsTo(Request, { foreignKey: "RequestId" });

// Request can have many RequestHistories
Request.hasMany(RequestHistory, { foreignKey: "RequestId" });
RequestHistory.belongsTo(Request, { foreignKey: "RequestId" });

// Task can belong to many Requests
Request.belongsTo(Task, { foreignKey: "TaskId" });
Task.hasMany(Request, { foreignKey: "TaskId" });

// Location can have many Tasks
Location.hasMany(Task, { foreignKey: "LocationId" });
Task.belongsTo(Location, { foreignKey: "LocationId" });

// Установите связи для RequestHistory
RequestHistory.belongsTo(User, { foreignKey: "UserId" });
Request.hasMany(RequestHistory, { foreignKey: "RequestId" });

// Синхронизация с базой данных
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});
