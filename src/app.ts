import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./routes";
const app: Application = express();

//morgen
app.use(morgan("tiny"));

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get static file
app.use(express.static("uploads"));

//route handle
app.use("/api/v1", routes);

//server live check
app.get("/", (req, res) => {
  res.send(
    "<h1 style='font-family: Arial, sans-serif; color: #4CAF50; text-align: center;'>Hey there! How can I assist you today?</h1>"
  );
});

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND",
      },
    ],
  });
});

export default app;
