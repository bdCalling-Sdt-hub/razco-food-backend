import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

//create stripe instance
const stripe = new Stripe(config.stripe_api_secret as string);

// const stripe = new Stripe(config.stripeApiSecret, {
//   apiVersion: "2022-11-15",
// });

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const orderData = req.body;
  const data = {
    user: user.id,
    ...orderData,
  };
  const result = await OrderService.createOrderToDB(data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order confirm successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationField);
  const result = await OrderService.getAllOrderToDB(paginationOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All user orders retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleUserOrderHistory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user.id;
    const result = await OrderService.getSingleUserOrderHistoryFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order history retrieved successfully",
      data: result,
    });
  }
);

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body;
  const result = await OrderService.updateOrderStatusToDB(id, status);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

//stripe payment intent
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body;

  if (typeof price !== "number" || price <= 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid price amount");
  }
  const amount = Math.trunc(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment intent created successfully",
    data: {
      client_secret: paymentIntent.client_secret,
      transactionId: paymentIntent.id,
    },
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleUserOrderHistory,
  updateOrderStatus,
  createPaymentIntent,
};
