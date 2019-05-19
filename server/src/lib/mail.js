import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import mailTemplates from './mailTemplate';
import { replaceString } from './util';

dotenv.config();


const mailAuth = {
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD
};

export class Mailer {
  constructor(service = 'gmail', auth = mailAuth) {
    this.init(service, auth);
  }

  init(service, auth) {
    this.transporter = nodeMailer.createTransport({
      service,
      auth
    });
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
