import express from "express";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import { CategoryController } from "./category.controller";
const router = express.Router();

router.post(
  "/create-category",
  auth(),
  fileHandler(),
  CategoryController.createCategory
);

router.post(
  "/create-subcategory",
  fileHandler(),
  CategoryController.createSubCategory
);

export const CategoryRoutes = router;
