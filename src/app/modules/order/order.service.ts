import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDB = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrderToDB = async (): Promise<IOrder[]> => {
  const result = await Order.find();
  return result;
};

const getSingleUserOrderHistoryFromDB = async (
  id: string
): Promise<IOrder[]> => {
  const result = await Order.find({ user: id });
  return result;
};

export const OrderService = {
  createOrderToDB,
  getAllOrderToDB,
  getSingleUserOrderHistoryFromDB,
};
