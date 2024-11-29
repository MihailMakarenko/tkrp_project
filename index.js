require("dotenv").config();
const express = require("express"); //импорт модуля
const sequelize = require("./db.js"); //импорт настроек БД
const cors = require("cors");
// const router = require("./routes/indexRouter.js");
const models = require("./models/index.js");
const passport = require("passport");

const PORT = process.env.PORT; //порт, на котором работает сервер

const app = express(); //создаем объект express
app.use(cors());
app.use(express.json());
// app.use("/api", router);
// app.use(passport.initialize());
// require("./middleware/passport")(passport);

const start = async () => {
  try {
    await sequelize.authenticate(); //подключение к БД
    await sequelize.sync(); //сверка состояния БД со схемой БД

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
