import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { ScanHistoryController } from "./scanHistory.controller";
const router = express.Router();

router.get(
  "/products",
  auth(USER_TYPE.USER),
  ScanHistoryController.getScanHistoryProducts
);

router.delete(
  "/barcode/:id",
  auth(USER_TYPE.USER),
  ScanHistoryController.deleteScanHistoryProduct
);

export const ScanHistoryRoutes = router;
