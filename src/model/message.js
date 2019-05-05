module.exports = (Model) => {
  class Message extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
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
    MessageModel.hasMany(Models.Message, {
      repliedTo: 'id',
    });
    MessageModel.hasOne(Models.User, {
      recipient: 'id',
    });
    MessageModel.belongsTo(Models.User, {
      sender: 'id',
    });
  };
  return MessageModel;
};
