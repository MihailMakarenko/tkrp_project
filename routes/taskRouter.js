const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.addTask);
router.get("/", taskController.getAll);
router.put("/:id", taskController.updateTaskById);
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
