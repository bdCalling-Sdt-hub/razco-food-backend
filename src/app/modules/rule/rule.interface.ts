import { Model } from "mongoose";

export type IRule = {
  content: string;
  type: "privacy-policy" | "terms-and-conditions" | "about";
};

export type RuleModel = Model<IRule, Record<string, unknown>>;
