const Model = require('./model');

class Message extends Model {
  constructor(modelName, schema, hooks, db) {
    super(modelName, hooks, db);
    this.schema = schema;
  }
}

module.exports = new Message('Message', {
  id: 'integer',
  createdOn: 'DateTime',
  sender: 'Integer',
  repliedTo: 'Integer',
  recipient: 'Integer',
  body: 'String',
  subject: 'String',
  excerpt: 'String',
}, {});
