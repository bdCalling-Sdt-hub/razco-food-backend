import { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null | undefined;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };
  unreadNotifications?: number;
  data?: T;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const resData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null || undefined,
    unreadNotifications: data.unreadNotifications,
    pagination: data.pagination || null || undefined,
    data: data.data,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
