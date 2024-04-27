import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { WishlistController } from "./wishlist.controller";
const router = express.Router();

router.post(
  "/add-to-wishlist",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  WishlistController.addToWishlist
);

router.get(
  "/products",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  WishlistController.getProductsFromWishlist
);

export const WishlistRoutes = router;
