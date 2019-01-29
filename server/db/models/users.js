const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { userTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Users = mongoose.model('users', new Schema({
  subscribedServices: [{
    endsAt: types.date(),
    serviceId: { ref: 'services', type: Schema.Types.ObjectId },
    startsAt: types.date(),
    subscriptionId: { ref: 'subscriptions', type: Schema.Types.ObjectId },
  }],
  walletId: { ref: 'wallets', type: Schema.Types.ObjectId },
  authentication: {
    password: types.string({ select: false }),
    salt: types.string({ select: false }),
    sessionToken: types.string({ select: false }),
  },
  contact: {
    email: types.string({ required: true }),
  },
  personal: {
    firstName: types.string({ required: true }),
    imageUrl: types.string(),
    lastName: types.string({ required: true }),
    nin: types.string({ required: true }),
  },
  type: types.string({ required: true, enum: _.keys(userTypes), default: userTypes.REGULAR }),

  __v: types.number({ select: false }),
  createdAt: types.date(),
  updatedAt: types.date({ select: false }),
}, { timestamps: true }));

module.exports.isValid = values => !Users(values).validateSync();

module.exports.create = (values) => {
  const user = _.omit(values, ['_id']);

  return Users(user).save()
    .then(createdUser => Promise.resolve(_.omit(createdUser.toObject(), ['authentication'])));
};

module.exports.getByEmail = (email) => {
  const query = { 'contact.email': new RegExp(`^${_.escapeRegExp(_.trim(email))}$`, 'i') };

  return Users.findOne(query);
};

module.exports.getBySessionToken = (token) => {
  const query = { 'authentication.sessionToken': token };

  return Users.findOne(query);
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Users.findOne(query);
};
