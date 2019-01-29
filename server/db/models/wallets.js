const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { Schema } = mongoose;

const Wallets = mongoose.model('wallets', new Schema({
  general: {
    amount: types.number({ default: 0 }),
  },
}, { timestamps: true }));

module.exports.isValid = values => !Wallets(values).validateSync();

module.exports.create = (values) => {
  const wallet = _.omit(values, ['_id']);

  return Wallets(wallet).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Wallets.findOne(query);
};
