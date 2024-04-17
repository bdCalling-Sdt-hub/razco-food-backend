import { ZodError } from "zod";
import { IErrorMessages } from "../types/errors";

const handleZodError = (error: ZodError) => {
  const errors: IErrorMessages[] = error.errors.map((el) => {
    return {
      path: el.path[el.path.length - 1],
      message: el.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
