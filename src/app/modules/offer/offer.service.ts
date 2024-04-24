import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import unlinkFile from "../../../util/unlinkFile";
import { IOffer } from "./offer.interface";
import { Offer } from "./offer.model";

const createOfferToDB = async (payload: IOffer) => {
  const createOffer = await Offer.create(payload);
  if (!createOffer) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create offer");
  }
  return createOffer;
};

const getAllOfferFromDB = async (): Promise<IOffer[]> => {
  const createOffer = await Offer.find();
  return createOffer;
};

const updateOfferFromDB = async (
  id: string,
  payload: Partial<IOffer>
): Promise<IOffer | null> => {
  const existingOffer = await Offer.findById(id);

  if (payload.offerImage) {
    unlinkFile(existingOffer?.offerImage);
  }

  const createOffer = await Offer.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return createOffer;
};

const deleteOfferFromDB = async (id: string): Promise<IOffer | null> => {
  //delete from local folder
  const existingOffer = await Offer.findById(id);
  unlinkFile(existingOffer?.offerImage);

  //delete from database
  const result = await Offer.findByIdAndDelete(id);
  return result;
};

export const OfferService = {
  createOfferToDB,
  getAllOfferFromDB,
  deleteOfferFromDB,
  updateOfferFromDB,
};
