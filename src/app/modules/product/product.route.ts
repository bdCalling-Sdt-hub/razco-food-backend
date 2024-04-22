import express from "express";
import fileHandler from "../../middlewares/fileHandler";
import { ProductController } from "./product.controller";
const router = express();

router.post("/create-product", fileHandler(), ProductController.createProduct);

export const ProductRoutes = router;
