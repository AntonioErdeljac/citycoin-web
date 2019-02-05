const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { servicesTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Services = mongoose.model('services', new Schema({
  company: {
    name: types.string({ required: true }),
    nin: types.string({ required: true }),
  },
  general: {
    name: types.string({ required: true }),
  },
  type: types.string({ enum: _.keys(servicesTypes) }),
  subscriptions: [{ ref: 'subscriptions', type: Schema.Types.ObjectId }],
  authorId: { ref: 'users', type: Schema.Types.ObjectId },
}, { timestamps: true }));

module.exports.isValid = values => !Services(values).validateSync();

module.exports.create = (values) => {
  const service = _.omit(values, ['_id']);

  return Services(service).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Services.findOne(query);
};

module.exports.updateById = (id, values) => {
  const service = _.omit(values, ['_id']);

  const query = {
    _id: id,
    authorId: service.authorId,
  };

  return Services.findOneAndUpdate(query, { $set: service }, { new: true });
};

module.exports.removeById = (id, options = {}) => {
  const { authorId } = options;

  const query = { _id: id };

  if (authorId) {
    query.authorId = authorId;
  }

  return Services.findOneAndDelete(query);
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
    Services.find(query)
      .populate('subscriptions'),
    Services.count(query),
  ])
    .then(([data, total]) => Promise.resolve({ data, total }));
};
