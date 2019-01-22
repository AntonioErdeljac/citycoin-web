const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { Schema } = mongoose;

const Cities = mongoose.model('cities', new Schema({
  general: {
    name: types.string({ required: true }),
  },
  location: {
    countryCode: types.string({ required: true }),
    iata: types.string({ required: true }),
  },
  services: [{ ref: 'services', type: Schema.Types.ObjectId }],
}, { timestamps: true }));

module.exports.isValid = values => !Cities(values).validateSync();

module.exports.create = (values) => {
  const city = _.omit(values, ['_id']);

  return Cities(city).save();
};

module.exports.findById = (id) => {
  const query = { _id: id };

  return Cities.findOne(query);
};
