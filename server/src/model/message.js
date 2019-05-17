export default (Model) => {
  class Message extends Model {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelName, schema, hooks) {
      super(modelName, schema, hooks);
    }
  }
  const MessageModel = new Message('Message', {
    id: { type: 'integer', format: 'myId', fieldName: 'ID' },
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
    sender: { type: 'integer', format: 'myId', fieldName: 'Message Sender' },
    repliedTo: { type: 'integer', format: 'myId', fieldName: 'Message Replying' },
    recipient: { type: 'integer', format: 'myId', fieldName: 'Message Recipient' },
    body: { type: 'string', required: true, fieldName: 'Message Body' },
    subject: { type: 'string', required: true, fieldName: 'Message Subject' },
    excerpt: { type: 'string' },
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
