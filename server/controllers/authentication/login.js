const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors, hash, tokens, build } = require('../../utils');

const { cookies } = require('../../../common/constants');

module.exports = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    const user = await db.Users.getByEmail(req.body.email)
      .select('+authentication.password +authentication.salt');

    if (!user) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    if (user.authentication.password !== hash.password(user.authentication.salt, req.body.password)) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    user.authentication.sessionToken = hash.authentication(tokens.generate(), user._id);

    res.cookie(cookies.AUTHENTICATION, user.authentication.sessionToken, build.cookieOptions());

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
