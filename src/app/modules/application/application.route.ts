import express from "express";
import { ApplicationController } from "./application.controller";
const router = express.Router();

router.post("/", ApplicationController.createApplication);

export const ApplicationRoutes = router;
