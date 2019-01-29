const db = require('../../db');
const { errorMessages } = require('../../constants');
const { tokens, hash, errors } = require('../../utils');

const { MIN_PASSWORD_LENGTH } = require('../../../common/constants');

module.exports = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await db.Users.getByEmail(user.contact.email);

    if (existingUser) {
      return res.status(409).json({ message: errorMessages.USER_EMAIL_409 }).end();
    }

    if (user.authentication.password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ message: errorMessages.USER_PASSWORD_400 }).end();
    }

    const salt = tokens.generate();
    user.authentication = {
      salt,
      password: hash.password(salt, user.authentication.password),
    };

    const wallet = await db.Wallets.create();

    user.walletId = wallet._id;

    await db.Users.create(user);

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
