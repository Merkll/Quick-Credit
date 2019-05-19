/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';

import { Mailer, MailEvent, SendMail } from '../src/lib/mail';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe('Mail', () => {
  describe('Mailer Instantiation', () => {
    it('Should instantiate the transporter', () => {
      expect(new Mailer().transporter).to.not.be.undefined;
    });
    it('Should use userdefined service and auth', () => {
      expect(new Mailer('zoho', {}).transporter).to.not.be.undefined;
    });
  });
  describe('Sending a Mail Event', () => {
    const data = {
      'client-name': faker.name.firstName(),
      'loan-id': faker.random.uuid(),
      to: faker.internet.email(),
    };
    it('Should return messageId', async () => {
      const messageId = await MailEvent('loan-approval', data);
      expect(messageId).to.not.be.undefined;
      expect(messageId).to.not.be.an('object');
    }).timeout(5000);
    it('Should return error objetc if template doesnt exist', async () => {
      const error = await MailEvent('loan-approve', data);
      expect(error).to.not.be.undefined;
      expect(error).to.be.an('object');
    }).timeout(5000);
  });
  describe('Sending a Mail', () => {
    it('Should return messageId', async () => {
      const messageId = await SendMail({ subject: 'loan-approval', body: 'Loan', to: 'tmmerkll@gmail.com' });
      expect(messageId).to.not.be.undefined;
      expect(messageId).to.not.be.an('object');
    }).timeout(5000);
  });
});
