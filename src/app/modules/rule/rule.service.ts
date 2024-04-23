import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IRule } from "./rule.interface";
import { Rule } from "./rule.model";

const createAboutToDB = async (payload: IRule): Promise<IRule> => {
  const isExistAbout = await Rule.findOne({ type: "about" });
  console.log(isExistAbout);
  if (isExistAbout) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "About already exist!");
  }
  if (!payload.type) {
    payload.type = "about";
  }

  const result = await Rule.create(payload);
  return result;
};

export const RuleService = {
  createAboutToDB,
};
