/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Message } from '../../src/model';

let MessageData;
describe('Message Model', () => {
  before(() => {
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
    Message.insert(MessageData);
  });


  context('Model Initialization', () => {
    it('Should return MessageData', () => {
      const { data } = Message.findAll();
      expect(data).to.be.eql(MessageData);
    });
  });

  context('Message update', () => {
    it('Should return MessageData', () => {
      const { id } = MessageData[4];
      const data = Message.update({
        body: '400',
      }, { id }).data[0];
      expect(data.id).to.be.eql(id);
    });
  });

  context('Message insert non array data', () => {
    it('Should return MessageData', () => {
      const data = Message.insert({
        id: 50,
        createdOn: new Date(),
        sender: faker.random.number(),
        repliedTo: faker.random.number(),
        recipient: faker.random.number(),
        body: faker.lorem.sentences(),
        subject: faker.lorem.sentence(),
        excerpt: faker.lorem.sentence(),
      }).data[0];
      expect(data.id).to.be.eql(50);
    });
  });
});
