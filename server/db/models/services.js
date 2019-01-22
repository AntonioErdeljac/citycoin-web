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
  subscriptions: [{
    price: types.number({ required: true }),
    duration: types.string({ required: true }),
  }],
}, { timestamps: true }));

module.exports.isValid = values => !Services(values).validateSync();

module.exports.create = (values) => {
  const service = _.omit(values, ['_id']);

  return Services(service).save();
};

module.exports.findById = (id) => {
  const query = { _id: id };

  return Services.findOne(query);
};
