import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { CartController } from "./cart.controller";
const router = express.Router();

router.post("/add-to-cart", auth(USER_TYPE.USER), CartController.addToCart);

router.get("/products", auth(USER_TYPE.USER), CartController.getCartProducts);

export const CartRoutes = router;
