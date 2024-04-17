import { IAccountActivationTemplate } from "../types/emailHelper";

export const accountActivationTemplate = (
  values: IAccountActivationTemplate
) => {
  const data = {
    email: values.email,
    subject: "Account activation mail",
    html: `
      <h1>Hey! ${values.name}</h1>
      <p>Your email verified code is <h2>${values.otp}</h2> to verify your email</p>
      <small>This code valid for 3minutes</small>
    `,
  };
  return data;
};
