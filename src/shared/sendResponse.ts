import { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null | undefined;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const resData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null || undefined,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
