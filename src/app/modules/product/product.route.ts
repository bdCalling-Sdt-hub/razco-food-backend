import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import { ProductController } from "./product.controller";
const router = express();

router.post(
  "/create-product",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  ProductController.createProduct
);

router
  .route("/:id")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    ProductController.getSingleProduct
  )
  .patch(
    fileHandler(),
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    ProductController.updateProduct
  )
  .delete(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    ProductController.deleteProduct
  );

router.get(
  "/related-product/:id",
  auth(USER_TYPE.USER),
  ProductController.getRelatedProduct
);

router.get(
  "/barcode/:id",
  auth(USER_TYPE.USER),
  ProductController.getBarcodeProduct
);

router.get(
  "/",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  ProductController.getAllProduct
);

export const ProductRoutes = router;
