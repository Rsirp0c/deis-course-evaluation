const homeController = require("../controllers/homeController");

const router = require("express").Router();
router.get("/", homeController.index);
router.get("/chat", homeController.chat);

module.exports = router;
