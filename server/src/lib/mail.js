import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import { google } from 'googleapis';

import mailTemplates from './mailTemplate';
import { replaceString } from './util';

dotenv.config();

const { OAuth2 } = google.auth;


export class Mailer {
  constructor() {
    this.init();
    this.isInit = false;
  }

  async init() {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET, // Client Secret
      'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    const { Authorization } = await oauth2Client.getRequestHeaders();
    const accessToken = Authorization.split('Bearer ')[1];
    this.transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER, 
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken
      }
    });
    this.isInit = true;
  }

  async send(data) {
    const { 
      to, subject, body 
    } = data;
    const mailOptions = {
      from: process.env.MAIL_SENDER, // sender address
      to, // list of receivers
      subject, // Subject line
      text: body, // plain text body
      html: body // html body
    };
    if (!this.isInit) await this.init();
    const { messageId } = await this.transporter.sendMail(mailOptions);
    return messageId;
  }

  async sendActivity(activity, data) {
    const template = mailTemplates[activity];
    if (!template) return { error: 'Mail template doesnt exist' };
    const subject = replaceString(template.subject, data);
    const body = replaceString(template.body, data);
    return this.send({ subject, body, ...data }); 
  }
}

export const MailEvent = async (activity, data) => {
  const Mail = await new Mailer().sendActivity(activity, data);
  return Mail;
};

export const SendMail = async () => new Mailer().send;
