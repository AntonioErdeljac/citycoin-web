const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { locationTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Cities = mongoose.model('cities', new Schema({
  general: {
    name: types.string({ required: true }),
  },
  location: {
    type: types.string({ default: locationTypes.POINT, required: true, enum: _.keys(locationTypes) }),
    coordinates: { type: [types.number()], index: '2dsphere' },
  },
  info: {
    countryCode: types.string({ required: true }),
    iata: types.string(),
  },
  services: [{ ref: 'services', type: Schema.Types.ObjectId }],
}, { timestamps: true }));

module.exports.isValid = values => !Cities(values).validateSync();

module.exports.create = (values) => {
  const city = _.omit(values, ['_id']);

  return Cities(city).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Cities.findOne(query);
};

module.exports.get = (options = {}) => {
  const { longitude, latitude, keyword } = options;

  let query = {};

  if (latitude && longitude) {
    const geoNearAggregation = [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          spherical: true,
          maxDistance: 100000,
          distanceField: 'dist.calculated',
        },
      },
      {
        $match: {
          'general.name': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i'),
        },
      },
    ];

    return Promise.all([
      Cities.aggregate([
        ...geoNearAggregation,
      ]),
      Cities.aggregate([
        ...geoNearAggregation,
        {
          $count: 'total',
        },
      ]),
    ])
      .then(([data, total]) => Promise.resolve({ data, total: total[0] ? total[0].total : 0 }));
  }

  if (keyword) {
    query = {
      'general.name': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i'),
    };
  }

  return Promise.all([
    Cities.find(query),
    Cities.count(query),
  ])
    .then(([data, total]) => Promise.resolve({ data, total }));
};
