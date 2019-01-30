const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { Schema } = mongoose;

const subscribedServices = mongoose.model('subscribedServices', new Schema({
  endsAt: types.date(),
  serviceId: { ref: 'services', type: Schema.Types.ObjectId },
  startsAt: types.date(),
  subscriptionId: { ref: 'subscriptions', type: Schema.Types.ObjectId },
  qrCode: types.string(),
}, { timestamps: true }));

module.exports.isValid = values => !subscribedServices(values).validateSync();

module.exports.create = (values) => {
  const subscribedService = _.omit(values, ['_id']);

  return subscribedServices(subscribedService).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return subscribedServices.findOne(query);
};
