const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.createComment);
router.get("/", commentController.getAll);
router.put("/:id", commentController.updateCommentById);
router.delete("/:id", commentController.deleteCommentById);

module.exports = router;
