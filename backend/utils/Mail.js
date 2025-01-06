import nodemailer from "nodemailer";

export const sendMail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: "Linkify",
    to,
    subject: "Password Reset",
    text: `Reset your password by clicking on the following link ${process.env.FRONTEND_LINK}/update-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};
