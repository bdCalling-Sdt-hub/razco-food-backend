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

  let result;
  let total;
  let unreadNotifications;
  if (user.role === "user") {
    result = await Notification.find({ recipient: user.id })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    total = await Notification.countDocuments({ recipient: user.id });
    unreadNotifications = await Notification.countDocuments({
      recipient: user.id,
      read: false,
    });
  } else {
    result = await Notification.find({
      role: { $in: ["admin", "super_admin"] },
    })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    total = await Notification.countDocuments({
      role: { $in: ["admin", "super_admin"] },
    });
    unreadNotifications = await Notification.countDocuments({
      role: { $in: ["admin", "super_admin"] },
      read: false,
    });
  }

  const totalPage = Math.ceil(total / limit);

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
  let unreadNotifications;
  if (user.role === "user") {
    await Notification.updateMany(
      { recipient: user.id, read: false },
      { read: true }
    );

    unreadNotifications = await Notification.countDocuments({
      recipient: user.id,
      read: false,
    });
  } else {
    await Notification.updateMany(
      { role: { $in: ["admin", "super_admin"] }, read: false },
      { read: true }
    );

    unreadNotifications = await Notification.countDocuments({
      role: { $in: ["admin", "super_admin"] },
      read: false,
    });
  }

  return unreadNotifications;
};

export const NotificationService = {
  getNotificationsFromDB,
  createNotificationToDB,
  readNotificationsToDB,
};
