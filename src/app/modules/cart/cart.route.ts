import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CartController } from "./cart.controller";
import { CartValidation } from "./cart.validation";
const router = express.Router();

router.post(
  "/add-to-cart",
  validateRequest(CartValidation.createCartZodSchema),
  auth(USER_TYPE.USER),
  CartController.addToCart
);

router.get("/products", auth(USER_TYPE.USER), CartController.getCartProducts);

router.delete("/:id", auth(USER_TYPE.USER), CartController.deleteCartProduct);

export const CartRoutes = router;
