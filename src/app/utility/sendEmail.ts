import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'nrasel452@gmail.com',
      pass: 'vacl wtzx nmns zlhk',
    },
  });

  await transporter.sendMail({
    from: 'nrasel452@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html: `<div ><h1>Password Reset</h1><p>Hi there,</p><p>We received a request to reset your password. Click the link below to reset it:</p><p><a href="${resetLink}" target="_blank">Reset Password</a></p><p>If you didn’t request this, you can safely ignore this email. Your password will remain the same.</p><p>Thank you,<br/>The Support Team</p></div>`, // html body
  });
};
