/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Message } from '../../src/model';

let MessageData;

before(async () => {
  MessageData = Array(10).fill(0).map((data, index) => ({
    id: index + 1,
    createdOn: new Date(),
    sender: faker.random.number(),
    repliedTo: faker.random.number(),
    recipient: faker.random.number(),
    body: faker.lorem.sentences(),
    subject: faker.lorem.sentence(),
    excerpt: faker.lorem.sentence(),
  }
  ));
  await Message.initialise();
  await Message.insert(MessageData);
});
after(async () => {
  await Message.deleteAll();
});
describe('Message Model', () => {
  context('Model Initialization', () => {
    it('Should return MessageData', async () => {
      const { data } = await Message.findAll();
      expect(data).to.be.an('array');
      expect(data[0]).to.have.property('id');
    });
  });

  context('Message update', () => {
    it('Should return MessageData', async () => {
      const { data } = await Message.update({
        body: '400',
      }, { id: { eq: 1 } });
      expect(data[0].id).to.be.eql(1);
    });
  });

  context('Message insert non array data', () => {
    it('Should return MessageData', async () => {
      const { data } = await Message.insert({
        id: 50,
        createdOn: new Date(),
        sender: faker.random.number(),
        repliedTo: faker.random.number(),
        recipient: faker.random.number(),
        body: faker.lorem.sentences(),
        subject: faker.lorem.sentence(),
        excerpt: faker.lorem.sentence(),
      });
      expect(data[0].id).to.be.eql(50);
    });
  });
});
