import { emailHelper } from "../../../helpers/emailHelper";
import { Application } from "./application.model";

const createApplicationToDB = async (payload: any) => {
  await Application.create(payload);
  emailHelper.applicationMail(payload);
};

export const ApplicationService = { createApplicationToDB };
