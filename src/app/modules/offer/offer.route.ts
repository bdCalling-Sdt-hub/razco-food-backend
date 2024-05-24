import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import { OfferController } from "./offer.controller";
const router = express();

router.post(
  "/create-offer",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  OfferController.createOffer
);
router.patch(
  "/:id",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  OfferController.updateOffer
);
router.delete(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  OfferController.deleteOffer
);
router.get(
  "/",
  //auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  OfferController.getAllOffer
);

export const OfferRoutes = router;
