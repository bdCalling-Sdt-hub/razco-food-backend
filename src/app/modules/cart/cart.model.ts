import { model, Schema } from "mongoose";
import { CartModel, ICart } from "./cart.interface";

const cartSchema = new Schema<ICart, CartModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

//match user
cartSchema.statics.isUserExistOnCart = async function (id) {
  return await Cart.findOne({ user: id });
};

export const Cart = model<ICart, CartModel>("Cart", cartSchema);
