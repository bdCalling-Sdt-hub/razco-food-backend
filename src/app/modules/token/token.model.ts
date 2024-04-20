import { model, Schema } from "mongoose";
import { IToken, TokenModel } from "./token.interface";

const tokenSchema = new Schema<IToken, TokenModel>(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Token = model<IToken, TokenModel>("Token", tokenSchema);
