const { FieldTypes } = require('../lib/schema-validator');

module.exports = (Model) => {
  class Message extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const MessageModel = new Message('Message', {
    id: FieldTypes.Integer,
    createdOn: FieldTypes.Date,
    sender: FieldTypes.Integer,
    repliedTo: FieldTypes.Integer,
    recipient: FieldTypes.Integer,
    body: FieldTypes.String,
    subject: FieldTypes.String,
    excerpt: FieldTypes.String,
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
