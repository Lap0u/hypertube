import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_GMAIL_ADDRESS,
        pass: process.env.GOOGLE_GMAIL_PASSWORD,
        clientId: process.env.GOOGLE_NODEMAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_NODEMAILER_REFRESH_TOKEN,
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:3000/forget-password/${token}`;
    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
