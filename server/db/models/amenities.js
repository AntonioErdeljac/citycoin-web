const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { amenitiesTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Amenities = mongoose.model('amenities', new Schema({
  company: {
    name: types.string({ required: true }),
    nin: types.string({ required: true }),
  },
  general: {
    name: types.string({ required: true }),
  },
  type: types.string({ enum: _.keys(amenitiesTypes) }),
  subscriptions: [{
    price: types.number({ required: true }),
    duration: types.string({ required: true }),
  }],
}, { timestamps: true }));

module.exports.isValid = values => !Amenities(values).validateSync();

module.exports.create = (values) => {
  const amenity = _.omit(values, ['_id']);

  return Amenities(amenity).save();
};

module.exports.findById = (id) => {
  const query = { _id: id };

  return Amenities.findOne(query);
};
