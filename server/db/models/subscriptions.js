const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { subscriptionsDurationUnitTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Subscriptions = mongoose.model('subscriptions', new Schema({
  general: {
    name: types.string({ required: true }),
    duration: types.number({ required: true }),
    durationUnit: types.string({ enum: _.keys(subscriptionsDurationUnitTypes) }),
    price: types.number({ required: true }),
  },
}, { timestamps: true }));

module.exports.isValid = values => !Subscriptions(values).validateSync();

module.exports.create = (values) => {
  const subscription = _.omit(values, ['_id']);

  return Subscriptions(subscription).save();
};

module.exports.updateById = (id, values) => {
  const subscription = _.omit(values, ['_id']);

  const query = {
    _id: id,
    authorId: subscription.authorId,
  };

  return Subscriptions.findOneAndUpdate(query, { $set: subscription }, { new: true });
};

module.exports.removeById = (id, options = {}) => {
  const { authorId } = options;

  const query = { _id: id };

  if (authorId) {
    query.authorId = authorId;
  }

  return Subscriptions.findOneAndDelete(query);
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Subscriptions.findOne(query);
};

module.exports.get = (options = {}) => {
  const { keyword, authorId } = options;

  let query = {};

  if (authorId) {
    query.authorId = authorId;
  }

  if (keyword) {
    query = {
      'general.name': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i'),
    };
  }

  return Promise.all([
    Subscriptions.find(query),
    Subscriptions.count(query),
  ])
    .then(([data, total]) => Promise.resolve({ data, total }));
};
