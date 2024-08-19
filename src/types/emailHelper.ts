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

export type INewOrder = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  totalItems: number;
  price: number;
};
