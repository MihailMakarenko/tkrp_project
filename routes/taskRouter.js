const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");

router.get("/getTasksByCategory/:category", taskController.getTasksByCategory);
router.post("/", taskController.addTask);
router.get("/", taskController.getAll);
router.put("/:id", taskController.updateTaskById);
router.delete("/:id", taskController.deleteTaskById);
router.get(
  "/getTasksByRoomNumber/:roomNumber",
  taskController.getTasksByRoomNumber
);

module.exports = router;
