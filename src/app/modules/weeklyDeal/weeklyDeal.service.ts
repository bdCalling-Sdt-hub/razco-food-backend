import { StatusCodes } from "http-status-codes";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import unlinkFile from "../../../util/unlinkFile";
import { IWeeklyDeal } from "./weeklyDeal.interface";
import { WeeklyDeal } from "./weeklyDeal.model";

const createWeeklyDealToDB = async (payload: IWeeklyDeal) => {
  const createWeeklyDeal = await WeeklyDeal.create(payload);
  if (!createWeeklyDeal) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create WeeklyDeal");
  }
  return createWeeklyDeal;
};

const getAllWeeklyDealFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IWeeklyDeal[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await WeeklyDeal.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await WeeklyDeal.countDocuments();
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

const updateWeeklyDealFromDB = async (
  id: string,
  payload: Partial<IWeeklyDeal>
): Promise<IWeeklyDeal | null> => {
  const existingWeeklyDeal = await WeeklyDeal.findById(id);

  if (payload.image) {
    unlinkFile(existingWeeklyDeal?.image);
  }

  const createWeeklyDeal = await WeeklyDeal.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return createWeeklyDeal;
};

const deleteWeeklyDealFromDB = async (
  id: string
): Promise<IWeeklyDeal | null> => {
  //delete from local folder
  const existingWeeklyDeal = await WeeklyDeal.findById(id);
  unlinkFile(existingWeeklyDeal?.image);

  //delete from database
  const result = await WeeklyDeal.findByIdAndDelete(id);
  return result;
};

export const WeeklyDealService = {
  createWeeklyDealToDB,
  getAllWeeklyDealFromDB,
  deleteWeeklyDealFromDB,
  updateWeeklyDealFromDB,
};
