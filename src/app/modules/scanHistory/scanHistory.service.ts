import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import { Product } from "../product/product.model";
import { ScanHistory } from "./scanHistory.model";

const getScanHistoryProductFromDB = async (user: JwtPayload) => {
  const scanHistoryRecords = await ScanHistory.find({ user: user.id });
  if (!scanHistoryRecords) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // Extract barcodes from scan history records
  const barcodes = scanHistoryRecords.map((record) => record.barcode);

  // Find products that match the barcodes
  const products = await Product.find({ barcode: { $in: barcodes } }).select(
    "_id productName productImage price discount weight barcode"
  );

  return products;
};

const deleteScanHistoryProductToDB = async (id: string) => {
  const isExist = await ScanHistory.findOne({ barcode: id });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  //delete scan history product
  const result = await ScanHistory.findOneAndDelete({ barcode: id });

  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "No scan history found for the user."
    );
  }
};

export const ScanHistoryService = {
  getScanHistoryProductFromDB,
  deleteScanHistoryProductToDB,
};
