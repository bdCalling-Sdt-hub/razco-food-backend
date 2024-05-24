import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";

import fileHandler from "../../middlewares/fileHandler";
import { SubcategoryController } from "./subcategory.controller";

const router = express.Router();

router.post(
  "/create-subcategory",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  SubcategoryController.createSubcategory
);

router.patch(
  "/popularity/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  SubcategoryController.makePopularSubcategory
);

router
  .route("/:id")
  .patch(
    fileHandler(),
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    SubcategoryController.updateSubcategory
  )
  .delete(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    SubcategoryController.deleteSubcategory
  );

router.get(
  "/",
  // auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  SubcategoryController.getAllSubcategory
);

export const SubcategoryRoutes = router;
