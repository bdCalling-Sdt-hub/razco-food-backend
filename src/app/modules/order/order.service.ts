import { StatusCodes } from "http-status-codes";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import { Cart } from "../cart/cart.model";
import { Notification } from "../notifications/notifications.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDB = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);

  //notification
  //@ts-ignore
  const socketIo = global.io;
  const notification = await Notification.create({
    recipient: payload.user,
    message: `Your order is now pending`,
    type: "order",
  });
  if (socketIo) {
    socketIo.emit(`notification::${payload.user}`, notification);
  }

  return result;
};

const getAllOrderToDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Order.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate([
      {
        path: "user",
        select: "_id name phone email address",
      },
      {
        path: "cart",
        populate: [
          {
            path: "products.product",
            select: "productName productImage price",
          },
        ],
      },
    ]);

  const total = await Order.countDocuments();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleUserOrderHistoryFromDB = async (
  id: string
): Promise<IOrder[]> => {
  const result = await Order.find({ user: id }).populate([
    {
      path: "user",
      select: "_id name phone email address",
    },
    {
      path: "cart",
      populate: [
        {
          path: "products.product",
          select: "productName productImage price weight",
        },
      ],
    },
  ]);
  return result;
};

const updateOrderStatusToDB = async (
  id: string,
  payload: { status: string }
): Promise<IOrder | null> => {
  const order = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!order) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order not found");
  }

  const findUser = await User.findById(order.user);
  if (!findUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //notification
  //@ts-ignore
  const socketIo = global.io;
  const notification = await Notification.create({
    recipient: order.user,
    message: `Your order status has been updated to ${order.status}`,
    type: "order",
  });
  if (socketIo) {
    socketIo.emit(`notification::${order.user}`, notification);
  }

  //If order status is 'shipped', delete the associated cart
  if (order?.status === "shipped") {
    await User.findOneAndUpdate(
      { _id: order.user },
      { "points.available": findUser.points?.available! + order.points },
      { new: true }
    );
    await Cart.findByIdAndDelete(order.cart);
    await Order.findByIdAndDelete(order._id);
  }

  return order;
};

export const OrderService = {
  createOrderToDB,
  getAllOrderToDB,
  getSingleUserOrderHistoryFromDB,
  updateOrderStatusToDB,
};
