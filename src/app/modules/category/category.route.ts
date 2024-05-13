import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import { CategoryController } from "./category.controller";
const router = express.Router();

router.post(
  "/create-category",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  CategoryController.createCategory
);

router
  .route("/:id")
  .patch(
    fileHandler(),
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    CategoryController.updateCategory
  )
  .delete(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    CategoryController.deleteCategory
  );

router.get(
  "/all-subcategories/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  CategoryController.getAllSubcategories
);

router.get(
  "/",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  CategoryController.getAllCategory
);

export const CategoryRoutes = router;
