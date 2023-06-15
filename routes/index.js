
import router from "express";
// import userRoutes from "./userRoutes";
// import courseRoutes from "./courseRoutes";
// import errorRoutes from "./errorRoutes";
// import apiRoutes from "./apiRoutes";
import evalForm from "./evalFormRoutes";

router.use("evalForm", evalForm);
// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);
// router.use("/api", apiRoutes);
// router.use("/", errorRoutes);


export default router;
