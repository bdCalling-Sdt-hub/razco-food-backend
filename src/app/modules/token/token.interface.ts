import { Model, Types } from "mongoose";

export type IToken = {
  token: string;
  user: Types.ObjectId;
};

export type TokenModel = Model<IToken, Record<string, unknown>>;
