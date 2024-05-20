import { StatusCodes } from "http-status-codes";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import unlinkFile from "../../../util/unlinkFile";
import { IOffer } from "./offer.interface";
import { Offer } from "./offer.model";

const createOfferToDB = async (payload: IOffer) => {
  const createOffer = await Offer.create(payload);
  if (!createOffer) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create offer");
  }
  return createOffer;
};

const getAllOfferFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOffer[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Offer.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Offer.countDocuments();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
};

const updateOfferFromDB = async (
  id: string,
  payload: Partial<IOffer>
): Promise<IOffer | null> => {
  const existingOffer = await Offer.findById(id);

  if (payload.offerImage) {
    unlinkFile(existingOffer?.offerImage);
  }

  const createOffer = await Offer.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return createOffer;
};

const deleteOfferFromDB = async (id: string): Promise<IOffer | null> => {
  //delete from local folder
  const existingOffer = await Offer.findById(id);
  unlinkFile(existingOffer?.offerImage);

  //delete from database
  const result = await Offer.findByIdAndDelete(id);
  return result;
};

export const OfferService = {
  createOfferToDB,
  getAllOfferFromDB,
  deleteOfferFromDB,
  updateOfferFromDB,
};
