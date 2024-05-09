import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import config from "../config";
import ApiError from "../errors/ApiErrors";
import { logger } from "../shared/logger";
import { ISendMail } from "../types/emailHelper";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: parseInt(config.email.port || "587"),
  secure: false, // Use `true` for port 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendMail = async (values: ISendMail) => {
  try {
    const info = await transporter.sendMail({
      from: config.email.user,
      to: values.email,
      subject: values.subject,
      html: values.html,
    });

    console.log("Mail", info.response);
    logger.info("MAIL SEND SUCCESSFULLY", info.accepted);
  } catch (error) {
    throw new ApiError(StatusCodes.FAILED_DEPENDENCY, error as string);
  }
};

export default sendMail;
