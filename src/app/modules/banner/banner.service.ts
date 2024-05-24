import { StatusCodes } from "http-status-codes";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import unlinkFile from "../../../util/unlinkFile";
import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";

const createBannerToDB = async (payload: IBanner): Promise<IBanner> => {
  const createBanner = await Banner.create(payload);
  if (!createBanner) {
    throw new ApiError(StatusCodes.OK, "Failed to created banner");
  }

  return createBanner;
};

const getAllBannerFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBanner[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Banner.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Banner.countDocuments();
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

const updateBannerToDB = async (
  id: string,
  payload: IBanner
): Promise<IBanner | null> => {
  const isBannerExist = await Banner.findById(id);
  if (payload.bannerImage) {
    unlinkFile(isBannerExist?.bannerImage);
  }

  const result = await Banner.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBannerToDB = async (id: string): Promise<IBanner | null> => {
  //delete from folder
  const isBannerExist = await Banner.findById(id);
  unlinkFile(isBannerExist?.bannerImage);

  //delete from database
  const result = await Banner.findByIdAndDelete(id);
  return result;
};

export const BannerService = {
  createBannerToDB,
  getAllBannerFromDB,
  updateBannerToDB,
  deleteBannerToDB,
};
