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
      replyTo: config.email.support,
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

const applicationMail = async (values: any) => {
  try {
    const info = await transporter.sendMail({
      from: `${values.name} ${values.email}`,
      replyTo: config.email.support,
      to: config.email.user,
      subject: "Employee Application Confirmation",
      html: `<div
          style="
            font-family: Verdana, Geneva, Tahoma, sans-serif, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          "
        >
          <div
            style="
              background-color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <div
              style="
                background-color: #4caf50;
                color: white;
                text-align: center;
                padding: 20px;
                border-radius: 10px 10px 0 0;
              "
            >
              <h1 style="margin: 0">Applicant Information</h1>
            </div>

            <!-- Content -->
            <div style="padding: 20px; color: #333">
              <!-- Personal Details -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Personal Details
                </h3>

                <p><strong>Name:</strong>${values.name}</p>
                <p><strong>Address:</strong>${
                  (values.address.street,
                  values.address.city,
                  values.address.state,
                  values.address.zip)
                }</p>
                <p><strong>Phone:</strong>${values.phone}</p>
                <p><strong>Email:</strong>${values.email}</p>
                <p><strong>Position Applied:</strong>${values.position}</p>
                <p><strong>Date Available:</strong>${
                  values.dateAvailAbility
                }</p>
                <p><strong>Expected Salary:</strong>${values.expectedSalary}</p>
              </div>

              <!-- Work Authorization -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Work Authorization
                </h3>
                <p><strong>US Citizen:</strong>${values.isUsCitizen}</p>
                <p><strong>Previously Worked:</strong>${
                  values.haveYouWorkBefore
                }</p>
                <p><strong>18+ Years Old:</strong>${values.isAdult}</p>
                <p><strong>Willing for Background Check:</strong>${
                  values.isPerformCheck
                }</p>
              </div>

              <!-- Availability -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Availability
                </h3>
                <p><strong>Monday:</strong>${values.availability.monday}-5pm</p>
                <p><strong>Tuesday:</strong>${
                  values.availability.tuesday
                }-5pm</p>
                <p><strong>Wednesday:</strong>${
                  values.availability.wednesday
                }-5pm</p>
                <p><strong>Thursday:</strong>${
                  values.availability.thursday
                }-5pm</p>
                <p><strong>Friday:</strong>${values.availability.friday}-5pm</p>
                <p><strong>Saturday:</strong>${values.availability.saturday}</p>
                <p><strong>Sunday:</strong>${values.availability.sunday}</p>
              </div>

              <!-- Education -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Education
                </h3>
                <p><strong>High School:</strong>${
                  values.education.highSchool.name
                } </p>
                <p><strong>Address:</strong>${
                  values.education.highSchool.address
                }</p>
                <p><strong>Years Attended:</strong>${
                  values.education.highSchool.form -
                  values.education.highSchool.to
                }</p>
                <p><strong>Graduated:</strong>${
                  values.education.highSchool.isGraduate
                }</p>
                <p><strong>Degree:</strong>${
                  values.education.highSchool.degree
                }</p>

                <p><strong>College:</strong>${
                  values.education.college.name
                } </p>
                <p><strong>Address:</strong>${
                  values.education.college.address
                }</p>
                <p><strong>Years Attended:</strong>${
                  values.education.college.form - values.education.college.to
                }</p>
                <p><strong>Graduated:</strong>${
                  values.education.college.isGraduate
                }</p>
                <p><strong>Degree:</strong>${
                  values.education.college.degree
                }</p>
              </div>

              <!-- Reference -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Reference
                </h3>
                <p><strong>Name:</strong>${values.reference.name}</p>
                <p><strong>Relationship:</strong>${
                  values.reference.relationship
                }</p>
                <p><strong>Company:</strong>${values.reference.company}</p>
                <p><strong>Phone:</strong>${values.reference.phone}</p>
                <p><strong>Address:</strong>${values.reference.address}</p>
              </div>

              <!-- Employment History -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Employment History
                </h3>
                <p><strong>Last Employer:</strong>${
                  values.employmentHistory.last
                }</p>
                <p><strong>Supervisor:</strong>${
                  values.employmentHistory.supervisor
                } </p>
                <p><strong>Job Title:</strong>${
                  values.employmentHistory.jobTitle
                } </p>
                <p><strong>Phone:</strong>${values.employmentHistory.phone}</p>
                <p><strong>Salary:</strong>${
                  values.employmentHistory.salary
                }</p>
                <p>
                  <strong>Responsibilities:</strong>${
                    values.employmentHistory.responsibilities
                  }
                </p>
                <p><strong>Start Date:</strong>${
                  values.employmentHistory.startDate
                }</p>
                <p><strong>End Date:</strong>${
                  values.employmentHistory.endDate
                }</p>
                <p>
                  <strong>Reason for Leaving:</strong>${
                    values.employmentHistory.reasonForLeaving
                  } Looking for growth
                  opportunities
                </p>
              </div>

              <!-- Military Service -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Military Service
                </h3>
                <p><strong>Branch:</strong>${values.militaryService.branch}</p>
                <p>
                  <strong>Service Dates:</strong>${
                    values.militaryService.form - values.militaryService.to
                  }
                </p>
                <p><strong>Rank at Discharge:</strong>${
                  values.militaryService.rankDischarge
                }</p>
                <p><strong>Type of Discharge:</strong>${
                  values.militaryService.typeOfDischarge
                }</p>
                <p><strong>Type of Discharge:</strong>${
                  values.militaryService.honorable
                }</p>
              </div>

              <!-- Signature -->
              <div style="margin-bottom: 20px">
                <h3
                  style="
                    margin-bottom: 5px;
                    font-size: 18px;
                    background: gray;
                    color: white;
                    padding: 5px;
                  "
                >
                  Signature
                </h3>
                <p><strong>Signature:</strong> ${values.signature} </p>
                <p><strong>Date:</strong> ${values.date} </p>
              </div>
            </div>
          </div>
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
  applicationMail,
};
