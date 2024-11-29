const Router = require("express");
const router = new Router();
const locationController = require("../controllers/locationController");

router.post("/", locationController.addLocation);
router.get("/", locationController.getAll);
router.put("/:id", locationController.updateLocationById);
router.delete("/:id", locationController.deleteLocationById);

module.exports = router;
