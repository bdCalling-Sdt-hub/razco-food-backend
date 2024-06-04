import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
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

  //cart product clear
  await Cart.findByIdAndUpdate(
    payload.cart,
    { $set: { products: [] } },
    { new: true }
  );

  //notification
  //@ts-ignore
  const socketIo = global.io;
  const notification = await Notification.create({
    recipient: payload.user,
    message: `Your order is now pending`,
    role: "user",
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
  const isExistOrder = await Order.findById(id);
  if (!isExistOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order not found");
  }
  //check product status shipped
  if (isExistOrder?.status === "shipped") {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This order already shipped, you can't change the status"
    );
  }

  //update status
  const order = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });

  //user check
  const findUser = await User.findById(order!.user);
  if (!findUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //notification
  //@ts-ignore
  const socketIo = global.io;
  const notification = await Notification.create({
    recipient: order!.user,
    message: `Your order status has been updated to ${order!.status}`,
    role: "user",
    type: "order",
  });
  if (socketIo) {
    socketIo.emit(`notification::${order!.user}`, notification);
  }

  //If order status is 'shipped', delete the associated cart
  if (order?.status === "shipped") {
    //user point update
    await User.findOneAndUpdate(
      { _id: order.user },
      { "points.available": findUser.points?.available! + order.points },
      { new: true }
    );
  }

  return order;
};

//call for pickup
const callForPickupToDB = async (user: JwtPayload) => {
  const isExistUser = await User.isUserExist(user.email);
  //@ts-ignore
  const socketIo = global.io;
  const notification = await Notification.create({
    message: `${isExistUser.name} is calling for pickup.`,
    role: "admin",
    type: "order",
  });
  if (socketIo) {
    socketIo.emit(`admin-notifications`, notification);
  }
};

//sales overview
const salesOverviewFromDB = async () => {
  const totalPendingOrders = await Order.countDocuments({ status: "pending" });
  const totalCompleteOrders = await Order.countDocuments({ status: "shipped" });

  const totalIncomeAggregate = await Order.aggregate([
    { $match: { status: "shipped" } },
    { $group: { _id: null, totalIncomes: { $sum: "$price" } } },
  ]);

  const totalSalesAggregate = await Order.aggregate([
    { $match: { status: "shipped" } },
    { $group: { _id: null, totalSales: { $sum: "$totalItem" } } },
  ]);

  const totalIncome =
    totalIncomeAggregate.length > 0 ? totalIncomeAggregate[0].totalIncomes : 0;
  const totalSales =
    totalIncomeAggregate.length > 0 ? totalSalesAggregate[0].totalSales : 0;

  //monthly sales calculate
  const currentYear = new Date().getFullYear();
  const months = [
    { name: "Jan", totalSale: 0 },
    { name: "Feb", totalSale: 0 },
    { name: "Mar", totalSale: 0 },
    { name: "Apr", totalSale: 0 },
    { name: "May", totalSale: 0 },
    { name: "Jun", totalSale: 0 },
    { name: "Jul", totalSale: 0 },
    { name: "Aug", totalSale: 0 },
    { name: "Sep", totalSale: 0 },
    { name: "Oct", totalSale: 0 },
    { name: "Nov", totalSale: 0 },
    { name: "Dec", totalSale: 0 },
  ];

  const monthlySales = await Order.aggregate([
    { $match: { status: "shipped" } }, // Filter for shipped orders
    {
      $project: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        price: 1,
      },
    },
    { $match: { year: currentYear } }, // Filter by the current year
    {
      $group: {
        _id: { year: "$year", month: "$month" },
        totalSales: { $sum: "$price" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
  ]);

  // Update the months array with the total sales for each month
  monthlySales.forEach((sale) => {
    const monthIndex = sale._id.month - 1; // Month is 1-based in MongoDB
    months[monthIndex].totalSale = sale.totalSales;
  });

  return {
    salesOverview: {
      totalIncome,
      totalSales,
      totalPendingOrders,
      totalCompleteOrders,
    },
    yearlySalesOverview: months,
  };
};

export const OrderService = {
  createOrderToDB,
  getAllOrderToDB,
  getSingleUserOrderHistoryFromDB,
  updateOrderStatusToDB,
  callForPickupToDB,
  salesOverviewFromDB,
};
