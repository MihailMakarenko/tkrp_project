const Router = require("express");
const router = new Router();
const requestHistoryController = require("../controllers/requestHistoryController");

router.post("/", requestHistoryController.addRequestHistory);
router.get("/", requestHistoryController.getAll);
router.put("/:id", requestHistoryController.updateRequestHistoryById);
router.delete("/:id", requestHistoryController.deleteRequestHistoryById);

module.exports = router;
