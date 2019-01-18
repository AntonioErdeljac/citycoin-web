const _ = require('lodash');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const types = require('./types');

const Users = mongoose.model('users', new Schema({
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
    lastName: types.string({ required: true }),
  },

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
  const query = { 'authentication.sesstionToken': token };

  return Users.findOne(query);
};
