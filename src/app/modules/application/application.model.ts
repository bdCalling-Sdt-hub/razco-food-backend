import { model, Schema } from "mongoose";
import { IApplication } from "./application.interface";

const applicationSchema = new Schema<IApplication>({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  dateAvailAbility: { type: String, required: true },
  expectedSalary: { type: String, required: true },
  isUsCitizen: { type: Boolean, required: true },
  haveYouWorkBefore: { type: Boolean, required: true },
  isAdult: { type: Boolean, required: true },
  isPerformCheck: { type: Boolean, required: true },
  availability: {
    monday: { type: String, required: true },
    tuesday: { type: String, required: true },
    wednesday: { type: String, required: true },
    thursday: { type: String, required: true },
    friday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  education: {
    highSchool: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      form: { type: String, required: true },
      to: { type: String, required: true },
      isGraduate: { type: Boolean, required: true },
      degree: { type: String, required: true },
    },
    college: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      form: { type: String, required: true },
      to: { type: String, required: true },
      isGraduate: { type: Boolean, required: true },
      degree: { type: String, required: true },
    },
  },
  reference: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  employmentHistory: {
    last: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    supervisor: { type: String, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: String, required: true },
    responsibilities: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reasonForLeaving: { type: String, required: true },
  },
  militaryService: {
    branch: { type: String, required: false },
    form: { type: String, required: false },
    to: { type: String, required: false },
    rankDischarge: { type: String, required: false },
    typeOfDischarge: { type: String, required: false },
    honorable: { type: String, required: false },
  },
  signature: { type: String, required: true },
  date: { type: String, required: true },
});

export const Application = model<IApplication>(
  "Application",
  applicationSchema
);
