module.exports = (Model) => {
  class Message extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks);
      this.schema = schema;
    }
  }

  const MessageModel = new Message('Message', {
    id: 'integer',
    createdOn: 'DateTime',
    sender: 'Integer',
    repliedTo: 'Integer',
    recipient: 'Integer',
    body: 'String',
    subject: 'String',
    excerpt: 'String',
  }, {});

  MessageModel.buildAssociation = (Models) => {
    MessageModel.hasMany(Models.Loan);
  };
  return MessageModel;
};
