const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors, tokens, hash } = require('../../utils');

const { MIN_PASSWORD_LENGTH } = require('../../../common/constants');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    const newUser = req.body;

    if (!newUser) {
      return res.status(400).json({ message: errorMessages.USERS_400 }).end();
    }

    const existingUser = await db.Users.getByEmail(newUser.contact.email);

    if (existingUser) {
      return res.status(409).json({ message: errorMessages.USER_EMAIL_409 }).end();
    }

    if (newUser.authentication.password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ message: errorMessages.USER_PASSWORD_400 }).end();
    }

    const salt = tokens.generate();
    newUser.authentication = {
      salt,
      password: hash.password(salt, newUser.authentication.password),
    };

    const updatedUser = {
      ...newUser,
      authorId: user._id,
    };

    const createdUser = await db.Users.create(updatedUser);

    return res.status(200).json(createdUser).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
