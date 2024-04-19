import { MulterFile } from "multer";

// Define a custom type for the files object
type CustomFilesObject = { [fieldname: string]: MulterFile[] } | MulterFile[];

// Extend the Request interface to include the categoryImage property
declare global {
  namespace Express {
    interface Request {
      files: CustomFilesObject;
    }
  }
}
