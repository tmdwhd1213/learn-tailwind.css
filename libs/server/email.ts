import { createTransport } from "nodemailer";

const smtpTransport = createTransport({
  service: "Naver",
  host: "smtp.naver.com",
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
