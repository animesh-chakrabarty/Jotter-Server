import nodemailer from "nodemailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

const sendMail = async (
  email: string,
  content: any
): Promise<SMTPTransport.SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `Jotter ${process.env.EMAIL}`,
    to: email,
    subject: `Jotter Verification Code`,
    html: `<h1>Your Verification Code is ${content}</h1>`,
  });

  return info;
};

export default sendMail;
