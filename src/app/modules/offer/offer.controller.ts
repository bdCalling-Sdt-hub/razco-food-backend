import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IOffer } from "./offer.interface";
import { OfferService } from "./offer.service";

const createOffer = catchAsync(async (req: Request, res: Response) => {
  const { offerName } = req.body;

  let offerImage = "";
  if (req.files && req.files.offerImage && req.files.offerImage[0]) {
    offerImage = `/images/${req.files.offerImage[0].filename}`;
  }
  const data = {
    offerName,
    offerImage,
  };

  const result = await OfferService.createOfferToDB(data);

  sendResponse<IOffer>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer created successfully",
    data: result,
  });
});

const getAllOffer = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferService.getAllOfferFromDB();

  sendResponse<IOffer[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer retrieved successfully",
    data: result,
  });
});

const deleteOffer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await OfferService.deleteOfferFromDB(id);

  sendResponse<IOffer>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer deleted successfully",
    data: result,
  });
});

const updateOffer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  let offerImage;
  if (req.files && req.files.offerImage && req.files.offerImage[0]) {
    offerImage = `/images/${req.files.offerImage[0].filename}`;
  }

  const payload = {};
  const result = await OfferService.updateOfferFromDB(id, payload);

  sendResponse<IOffer>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer updated successfully",
    data: result,
  });
});

export const OfferController = {
  createOffer,
  getAllOffer,
  deleteOffer,
  updateOffer,
};
