export type ISendMail = {
  email: string;
  subject: string;
  html: string;
};

export type IAccountActivationTemplate = {
  otp: number;
  email: string;
  name: string;
};

export type IForgetPasswordTemplate = {
  otp: number;
  email: string;
};
