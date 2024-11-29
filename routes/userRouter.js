const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/login", userController.login);
router.post("/registration", userController.regestration);
router.get("/", userController.getAll);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

module.exports = router;

// const Router = require("express");
// const router = new Router();
// const userController = require("../controllers/userController");
// const passport = require("passport");
// const roleCheck = require("../middleware/roleCheck");

// router.get("/login", userController.login);
// // 1. Создание нового пользователя
// router.post("/", userController.createUser);

// // 2. получение всех пользователей
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   roleCheck("admin"),
//   userController.getAllUsers
// );

// // 3. Получение пользователя по id
// router.get("/:id", userController.getUserById);

// // 4. Обновление пользователя
// router.put("/:id", userController.updateUser); // Обновление по ID

// // 5. Удаление пользователя
// router.delete("/:id", userController.deleteUser); // Удаление по ID

// module.exports = router;
