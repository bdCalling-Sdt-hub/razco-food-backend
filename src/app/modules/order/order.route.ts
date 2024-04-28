import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";
const router = express.Router();

router.get(
  "/history",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  OrderController.getSingleUserOrderHistory
);

router
  .route("/")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    OrderController.getAllOrders
  )
  .post(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    OrderController.createOrder
  );

export const OrderRoutes = router;
