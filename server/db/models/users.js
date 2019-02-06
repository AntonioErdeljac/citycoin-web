const _ = require('lodash');
const mongoose = require('mongoose');

const types = require('./types');

const { userTypes } = require('../../../common/constants');

const { Schema } = mongoose;

const Users = mongoose.model('users', new Schema({
  subscribedServices: [{ ref: 'subscribedServices', type: Schema.Types.ObjectId }],
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
  authorId: { ref: 'users', type: Schema.Types.ObjectId },
  services: [{ ref: 'services', type: Schema.Types.ObjectId }],

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

module.exports.getByEmail = (email, options = {}) => {
  const { excludedUserId, type } = options;

  const query = { 'contact.email': new RegExp(`^${_.escapeRegExp(_.trim(email))}$`, 'i') };

  if (excludedUserId) {
    query._id = { $ne: excludedUserId };
  }

  if (type) {
    query.type = type;
  }

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

module.exports.get = (options = {}) => {
  const { keyword, authorId } = options;

  const query = {};

  if (authorId) {
    query.authorId = authorId;
  }

  if (keyword) {
    query.$or = [
      { 'personal.firstName': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i') },
      { 'personal.lastName': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i') },
    ];
  }

  return Promise.all([
    Users.find(query)
      .populate('services'),
    Users.count(query),
  ])
    .then(([data, total]) => Promise.resolve({ data, total }));
};

module.exports.removeById = (id, options = {}) => {
  const { authorId } = options;

  const query = { _id: id };

  if (authorId) {
    query.authorId = authorId;
  }

  return Users.findOneAndDelete(query);
};

module.exports.updateById = (id, values) => {
  const user = _.omit(values, ['_id']);

  const query = {
    _id: id,
    authorId: user.authorId,
  };

  return Users.findOneAndUpdate(query, { $set: user }, { new: true });
};
