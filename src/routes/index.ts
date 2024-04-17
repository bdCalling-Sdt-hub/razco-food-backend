import express from "express";
import { UserRoutes } from "../app/modules/user/user.route";
const router = express.Router();

router.use("/user", UserRoutes);

export default router;
