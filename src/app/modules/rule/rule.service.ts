import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IRule } from "./rule.interface";
import { Rule } from "./rule.model";

//about us
const createAboutToDB = async (payload: IRule): Promise<IRule> => {
  const isExistAbout = await Rule.findOne({ type: "about" });

  if (isExistAbout) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "About already exist!");
  }
  if (!payload.type) {
    payload.type = "about";
  }

  const result = await Rule.create(payload);
  return result;
};

const getAboutFromDB = async () => {
  const result = await Rule.findOne({ type: "about" });
  return result;
};

const updateAboutToDB = async (payload: IRule): Promise<IRule | null> => {
  const result = await Rule.findOneAndUpdate({ type: "about" }, payload, {
    new: true,
  });
  return result;
};

//terms and conditions
const createTermsAndConditionsToDB = async (payload: IRule): Promise<IRule> => {
  const isExistAbout = await Rule.findOne({ type: "terms-and-conditions" });

  if (isExistAbout) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Terms and conditions already exist!"
    );
  }
  if (!payload.type) {
    payload.type = "terms-and-conditions";
  }

  const result = await Rule.create(payload);
  return result;
};

const getTermsAndConditionsFromDB = async () => {
  const result = await Rule.findOne({ type: "terms-and-conditions" });
  return result;
};

const updateTermsAndConditionsFromDB = async (
  payload: IRule
): Promise<IRule | null> => {
  const result = await Rule.findOneAndUpdate(
    { type: "terms-and-conditions" },
    payload,
    {
      new: true,
    }
  );
  return result;
};

//privacy policy
const createPrivacyPolicyToDB = async (payload: IRule): Promise<IRule> => {
  const isExistAbout = await Rule.findOne({ type: "privacy-policy" });

  if (isExistAbout) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Privacy policy already exist!"
    );
  }
  if (!payload.type) {
    payload.type = "privacy-policy";
  }

  const result = await Rule.create(payload);
  return result;
};

const getPrivacyPolicyFromDB = async () => {
  const result = await Rule.findOne({ type: "privacy-policy" });
  console.log(result);
  return result;
};

const updatePrivacyPolicyToDB = async (
  payload: IRule
): Promise<IRule | null> => {
  const result = await Rule.findOneAndUpdate(
    { type: "privacy-policy" },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const RuleService = {
  createAboutToDB,
  getAboutFromDB,
  updateAboutToDB,
  createTermsAndConditionsToDB,
  getTermsAndConditionsFromDB,
  updateTermsAndConditionsFromDB,
  createPrivacyPolicyToDB,
  getPrivacyPolicyFromDB,
  updatePrivacyPolicyToDB,
};
