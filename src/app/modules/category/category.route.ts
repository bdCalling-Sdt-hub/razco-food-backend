import express from "express";
import fileHandler from "../../middlewares/fileHandler";
import { CategoryController } from "./category.controller";
const router = express.Router();

router.post(
  "/create-category",
  fileHandler(),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
