import { Model } from "mongoose";

export type IRule = {
  content: string;
  type: "privacy_policy" | "terms_conditions" | "about";
};

export type RuleModel = Model<IRule, Record<string, unknown>>;
