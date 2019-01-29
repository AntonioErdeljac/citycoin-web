const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.token) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    const user = await db.Users.getBySessionToken(req.params.token)
      .select('+authentication.password +authentication.salt')
      .populate('wallet');

    if (!user) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    return res.status(200).json(user).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
