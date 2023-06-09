const router = require("express").Router();
const userRoutes = require("./userRoutes"),
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes");
const apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);

router.use("/courses", courseRoutes);

router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;
