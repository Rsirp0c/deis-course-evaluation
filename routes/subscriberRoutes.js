const router = require("express").Router();
const subscribersController = require("../controllers/subscribersController");
router.get("/", subscribersController.getAllSubscribers);
router.get("/subscribe", subscribersController.getSubscriberPage);
router.post("/subscribe", subscribersController.saveSubscription);
module.exports = router;
