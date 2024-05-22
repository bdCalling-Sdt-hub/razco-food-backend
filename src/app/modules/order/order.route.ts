import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";
const router = express.Router();

//stripe payment intent
router.post(
  "/create-payment-intent",
  auth(USER_TYPE.USER),
  validateRequest(OrderValidation.createPaymentIntentZodSchema),
  OrderController.createPaymentIntent
);

//call for pickup
router.get(
  "/call-for-pickup",
  auth(USER_TYPE.USER),
  OrderController.callForPickup
);

//user order history retrieved
router.get(
  "/history",
  auth(USER_TYPE.USER),
  OrderController.getSingleUserOrderHistory
);

//user order history update here
router.patch(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  OrderController.updateOrderStatus
);

router
  .route("/")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    OrderController.getAllOrders
  )
  .post(
    auth(USER_TYPE.USER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  );

export const OrderRoutes = router;
