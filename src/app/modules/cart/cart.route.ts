import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { CartController } from "./cart.controller";
const router = express.Router();

router.post(
  "/add-to-cart",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),

  CartController.addToCart
);

export const CartRoutes = router;
