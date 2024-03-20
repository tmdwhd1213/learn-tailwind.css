import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  host: process.env.HOST_NAVER,
  port: 587,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PWD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
