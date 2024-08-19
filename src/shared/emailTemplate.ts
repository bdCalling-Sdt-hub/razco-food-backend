import config from "../config";
import {
  IAccountActivationTemplate,
  IForgetPasswordTemplate,
  INewOrder,
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

export const NewOrderMail = (values: INewOrder) => {
  const data = {
    email: config.email.support,
    subject: "New Order Received",
    html: `
      <div style="width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 50px;">
            <img src="https://razcofoods.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftitle.dc72d09e.png&w=256&q=75" alt="Company Logo" style="width: 150px;">
            <h1 style="font-size: 24px;">Order ${values.orderId}</h1>
        </div>
        <div style="background-color: #f6fff6; padding: 15px; border-radius:5px;">
            <p style="font-size: 18px;">A new order has been placed. Below are the details of the order:</p>
            <p style="font-size: 18px;"><strong>Customer Name:</strong> ${values.customerName}</p>
            <p style="font-size: 18px;"><strong>Delivery Address:</strong><br>
  ${values.deliveryAddress}</p>
          
            <div style="margin: 20px 0;">
                <h2 style="font-size: 20px; color: #333;">Total Items: ${values.totalItems}</h2>
            </div>
            <h2 style="font-size: 20px;">Total Price: ${values.price}</h2>
        </div>
        <div style="font-size: 12px; text-align: center; margin-top: 20px;">
            <p>This email was sent to notify you of a new order placed through Razco Foods.</p>
            <p>Please review the order and proceed with the necessary actions.</p>
            <p>Contact Information: ${values.customerEmail} | ${values.customerPhone}</p>
            <p>If you need to contact the customer for further information, please do so using the details provided above.</p>
        </div>
    </div>
    `,
  };
  return data;
};
