const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { subscriptionUnitTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Subscriptions = mongoose.model('subscriptions', new Schema({
  description: types.number({ required: true }),
  duration: types.number({ required: true }),
  price: types.number({ required: true }),
  unit: types.string({ enum: _.keys(subscriptionUnitTypes) }),
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
