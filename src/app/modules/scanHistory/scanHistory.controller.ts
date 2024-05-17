import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScanHistoryService } from "./scanHistory.service";

const getScanHistoryProducts = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ScanHistoryService.getScanHistoryProductFromDB(user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Scan history product retrieved successfully",
      data: result,
    });
  }
);

const deleteScanHistoryProduct = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await ScanHistoryService.deleteScanHistoryProductToDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Scan history product deleted successfully",
    });
  }
);

export const ScanHistoryController = {
  getScanHistoryProducts,
  deleteScanHistoryProduct,
};
