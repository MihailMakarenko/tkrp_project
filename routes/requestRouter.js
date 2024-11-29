const Router = require("express");
const router = new Router();
const requestController = require("../controllers/requestController");

router.post("/", requestController.addRequest);
router.get("/", requestController.getAll);
router.put("/:id", requestController.updateRequestById);
router.delete("/:id", requestController.deleteRequestById);

module.exports = router;
