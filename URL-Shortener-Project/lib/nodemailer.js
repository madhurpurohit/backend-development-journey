import nodemailer from "nodemailer";
import "dotenv/config";

// const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: process.env.ETHEREAL_USER,
    user: process.env.EMAIL_USER,
    // pass: process.env.ETHEREAL_PASSWORD,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `'URL SHORTENER' < ${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    // const testEmailURL = nodemailer.getTestMessageUrl(info);
    // console.log("Verify Email: ", testEmailURL);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
