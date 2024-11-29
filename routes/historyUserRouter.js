const Router = require("express");
const router = new Router();
const historyUserController = require("../controllers/historyUserController");

router.post("/", historyUserController.addHistory);
router.get("/", historyUserController.getAll);
router.put("/:id", historyUserController.updateHistoryById);
router.delete("/:id", historyUserController.deleteHistoryById);

module.exports = router;
