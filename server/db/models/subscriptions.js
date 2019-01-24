const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { subscriptionsDurationUnitTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Subscriptions = mongoose.model('subscriptions', new Schema({
  description: types.number({ required: true }),
  duration: types.number({ required: true }),
  durationUnit: types.string({ enum: _.keys(subscriptionsDurationUnitTypes) }),
  price: types.number({ required: true }),
}, { timestamps: true }));

module.exports.isValid = values => !Subscriptions(values).validateSync();

module.exports.create = (values) => {
  const subscription = _.omit(values, ['_id']);

  return Subscriptions(subscription).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Subscriptions.findOne(query);
};
