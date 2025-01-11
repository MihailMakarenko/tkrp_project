const Router = require("express");
const router = new Router();
const notificationController = require("../controllers/notificationController");

router.post("/", notificationController.addNotification);
router.get(
  "/getNotificationById/:notificationId",
  notificationController.getNotificationById
);
router.get(
  "/getNotificationsByUserId/:userId",
  notificationController.getNotificationsByUserId
);
router.get("/", notificationController.getAll);
router.put("/:id", notificationController.updateNotificationById);
router.delete("/:id", notificationController.deleteNotificationById);

module.exports = router;