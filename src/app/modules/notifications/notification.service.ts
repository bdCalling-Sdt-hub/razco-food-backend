import { JwtPayload } from "jsonwebtoken";
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../types/pagination";
import { INotification } from "./notifications.interface";
import { Notification } from "./notifications.model";

const createNotificationToDB = async (payload: INotification) => {
  await Notification.create(payload);
};

const getNotificationsFromDB = async (
  user: JwtPayload,
  paginationOptions: IPaginationOptions
) => {
  const { skip, limit, sortBy, sortOrder, page } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Notification.find({ recipient: user.id })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments({ recipient: user.id });
  const totalPage = Math.ceil(total / limit);

  const unreadNotifications = await Notification.countDocuments({
    recipient: user.id,
    read: false,
  });

  return {
    meta: {
      limit,
      page,
      totalPage,
      total,
    },
    unreadNotifications: unreadNotifications,
    data: result,
  };
};

const readNotificationsToDB = async (user: JwtPayload) => {
  await Notification.updateMany(
    { recipient: user.id, read: false },
    { read: true }
  );

  const unreadNotifications = await Notification.countDocuments({
    recipient: user.id,
    read: false,
  });

  return unreadNotifications;
};

export const NotificationService = {
  getNotificationsFromDB,
  createNotificationToDB,
  readNotificationsToDB,
};
