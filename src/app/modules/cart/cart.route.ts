import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CartController } from "./cart.controller";
import { CartValidation } from "./cart.validation";
const router = express.Router();

router.post(
  "/add-to-cart",
  auth(USER_TYPE.USER),
  validateRequest(CartValidation.createCartZodSchema),
  CartController.addToCart
);

//promo code apply
router.post(
  "/apply-promo-code",
  auth(USER_TYPE.USER),
  validateRequest(CartValidation.createApplyPromoCodeZodSchema),
  CartController.applyPromoCode
);

//cart product retrieved
router.get("/products", auth(USER_TYPE.USER), CartController.getCartProducts);

//delete cart product
router.delete("/:id", auth(USER_TYPE.USER), CartController.deleteCartProduct);

export const CartRoutes = router;
