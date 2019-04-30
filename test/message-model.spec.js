/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const { Message } = require('../src/model/');

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
});
