import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "gio.patsia@gmail.com",
    pass: "tyti gbgb tcah dbtz ",
  },
});

export default transporter;
