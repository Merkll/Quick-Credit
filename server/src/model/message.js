import { FieldTypes } from '../lib/schema-validator';

export default (Model) => {
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
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map((detail) => {
        const messageData = detail;
        messageData.createdOn = new Date();
        return messageData;
      });
    },
    beforeUpdate: (data) => {
      const details = data;
      details.updatedOn = new Date();
      return details;
    },
  });

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
