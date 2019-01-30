const db = require('../../db');
const { errorMessages } = require('../../constants');
const { tokens, hash, errors, build } = require('../../utils');

const { MIN_PASSWORD_LENGTH, cookies } = require('../../../common/constants');

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

    const createdUser = await db.Users.create(user);

    const foundUser = await db.Users.getById(createdUser._id)
      .select('+authentication.password +authentication.salt');

    foundUser.authentication.sessionToken = hash.authentication(tokens.generate(), foundUser._id);

    await foundUser.save();

    res.cookie(cookies.AUTHENTICATION, foundUser.authentication.sessionToken, build.cookieOptions());

    return res.status(200).json(foundUser).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
