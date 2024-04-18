import express from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { UserRoutes } from "../app/modules/user/user.route";
const router = express.Router();

router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);

export default router;
