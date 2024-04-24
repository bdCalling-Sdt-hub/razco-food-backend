import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
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

const getAllBannerFromDB = async (): Promise<IBanner[]> => {
  const result = await Banner.find();
  return result;
};

const updateBannerToDB = async (
  id: string,
  payload: IBanner
): Promise<IBanner | null> => {
  const isBannerExist = await Banner.findById(id);
  if (payload.bannerImage) {
    unlinkFile(isBannerExist?.bannerImage);
  }
  console.log(payload);
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
