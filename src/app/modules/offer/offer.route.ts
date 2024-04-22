import express from "express";
import fileHandler from "../../middlewares/fileHandler";
import { OfferController } from "./offer.controller";
const router = express();

router.post("/create-offer", fileHandler(), OfferController.createOffer);
router.patch("/:id", fileHandler(), OfferController.updateOffer);
router.delete("/:id", OfferController.deleteOffer);
router.get("/", OfferController.getAllOffer);

export const OfferRoutes = router;
