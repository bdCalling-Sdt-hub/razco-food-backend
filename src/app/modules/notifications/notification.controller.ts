import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { NotificationService } from "./notification.service";

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const paginationOptions = pick(req.query, paginationField);

  const result = await NotificationService.getNotificationsFromDB(
    user,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notifications retrieved successfully",
    pagination: result.meta,
    unreadNotifications: result.unreadNotifications,
    data: result.data,
  });
});

const readNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await NotificationService.readNotificationsToDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notifications read successfully",
    unreadNotifications: result,
  });
});

export const NotificationController = {
  getNotifications,
  readNotifications,
};
