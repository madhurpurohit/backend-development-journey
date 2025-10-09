import nodemailer from "nodemailer";
import "dotenv/config";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: `'URL SHORTENER' < ${testAccount.user}>`,
    to,
    subject,
    html,
  });

  const testEmailURL = nodemailer.getTestMessageUrl(info);
  console.log("Verify Email: ", testEmailURL);
};
