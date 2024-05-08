import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { WishlistController } from "./wishlist.controller";
const router = express.Router();

router.get(
  "/products",
  auth(USER_TYPE.USER),
  WishlistController.getProductsFromWishlist
);

router.post("/", auth(USER_TYPE.USER), WishlistController.addToWishlist);

export const WishlistRoutes = router;
