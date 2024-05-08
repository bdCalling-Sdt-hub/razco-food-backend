import { Cart } from "../cart/cart.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDB = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrderToDB = async (): Promise<IOrder[]> => {
  const result = await Order.find().populate([
    {
      path: "user",
      select: "_id name phone email address",
    },
    {
      path: "cart",
      populate: [
        { path: "products.product", select: "productName productImage price" },
      ],
    },
  ]);
  return result;
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
        { path: "products.product", select: "productName productImage price" },
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

  //If order status is 'shipped', delete the associated cart
  if (order?.status === "shipped") {
    const result = await Cart.findByIdAndDelete(order.cart);
    console.log("dele", result);
  }

  return order;
};

export const OrderService = {
  createOrderToDB,
  getAllOrderToDB,
  getSingleUserOrderHistoryFromDB,
  updateOrderStatusToDB,
};
