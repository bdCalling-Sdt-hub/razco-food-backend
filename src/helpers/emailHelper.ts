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
      from: `"Razco Foods" ${config.email.user}`,
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

const supportEmail = async (values: any) => {
  try {
    const info = await transporter.sendMail({
      from: `${values.name} ${values.email}`,
      replyTo: values.email,
      to: config.email.user,
      subject: "Support For Razco Foods shop",
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #ffffff; padding: 30px; border-radius: 15px; max-width: 600px; margin: 30px auto; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); border-left: 6px solid #4CAF50; border-right: 6px solid #4CAF50;">
    <h2 style="color: #4CAF50; font-size: 28px; margin-bottom: 25px; border-bottom: 2px solid #ddd; padding-bottom: 15px; font-family: 'Lora', serif;">Support</h2>
    <p style="margin: 15px 0; color: #333; font-family: 'Lora', serif;"><strong style="color: #4CAF50;">Name:</strong> ${values.name}</p>
    <p style="margin: 15px 0; color: #333; font-family: 'Lora', serif;"><strong style="color: #4CAF50;">Email:</strong> ${values.email}</p>
    <p style="margin: 15px 0; color: #333; font-family: 'Lora', serif;"><strong style="color: #4CAF50;">Phone:</strong> ${values.phone}</p>
    <p style="margin: 15px 0; color: #333; font-family: 'Lora', serif;"><strong style="color: #4CAF50;">Message:</strong></p>
    <p style="margin: 15px 0; color: #333; font-family: 'Lora', serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);">${values.message}</p>
</div>`,
    });

    console.log("Mail", info.response);
    logger.info("MAIL SEND SUCCESSFULLY", info.accepted);
  } catch (error) {
    throw new ApiError(StatusCodes.FAILED_DEPENDENCY, error as string);
  }
};

export const emailHelper = {
  sendMail,
  supportEmail,
};
