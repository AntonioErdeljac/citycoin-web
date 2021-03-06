const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors, hash, tokens, build } = require('../../utils');

const { cookies, userTypes } = require('../../../common/constants');

module.exports = async (req, res) => {
  try {
    const { isBusiness } = req.query;

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    const user = await db.Users.getByEmail(req.body.email, isBusiness ? { type: userTypes.ADMIN } : undefined)
      .populate({
        path: 'subscribedServices',
        populate: {
          path: 'serviceId',
        },
      })
      .populate({
        path: 'subscribedServices',
        populate: {
          path: 'subscriptionId',
        },
      })
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
