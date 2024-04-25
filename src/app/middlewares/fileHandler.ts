import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import ApiError from "../../errors/ApiErrors";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

const fileHandler = () => {
  //access storage for customize file name
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/images");
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  //file filtering and field filter
  const fileFilter = (
    req: Request,
    file: MulterFile,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "Only .jpg, .jpeg, .png file supported!"
        )
      );
    }
  };
  const upload = multer({
    //dest: "./uploads/",
    storage: storage,
    limits: {
      fileSize: 3000000, //3MB
    },
    fileFilter: fileFilter,
  }).fields([
    { name: "categoryImage", maxCount: 1 },
    { name: "subCategoryImage", maxCount: 1 },
    { name: "offerImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]);

  return upload;
};

export default fileHandler;
