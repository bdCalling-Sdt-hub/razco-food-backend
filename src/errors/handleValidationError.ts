import { Error } from "mongoose";
import { IErrorMessages } from "../types/errors";

const handleValidationError = (error: Error.ValidationError) => {
  const errors: IErrorMessages[] = Object.values(error.errors).map(
    (el: Error.ValidatorError | Error.CastError) => {
      return {
        path: el.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
