import {
  IAccountActivationTemplate,
  IForgetPasswordTemplate,
} from "../types/emailHelper";

export const accountActivationTemplate = (
  values: IAccountActivationTemplate
) => {
  const data = {
    email: values.email,
    subject: "Confirm your account",
    html: `
      <div style="font-family: Arial, sans-serif;">
      <h1 style="color: #333;">Hi, ${values.name}!</h1>
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single-use code is:</p>
      <div style="background: #4CAF50; width: 80px; padding: 5px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin-bottom: 20px;">${values.otp}</div>
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
      </div>
    `,
  };
  return data;
};

export const forgetPasswordTemplate = (values: IForgetPasswordTemplate) => {
  const data = {
    email: values.email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif;">
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single-use code is:</p>
      <div style="background: #4CAF50; width: 80px; padding: 5px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin-bottom: 20px;">${values.otp}</div>
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
      </div>
    `,
  };
  return data;
};
