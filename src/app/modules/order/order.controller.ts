import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

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
  const result = await OrderService.getAllOrderToDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All user orders retrieved successfully",
    data: result,
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

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleUserOrderHistory,
};
