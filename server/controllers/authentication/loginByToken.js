const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.token) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    const user = await db.Users.getBySessionToken(req.params.token)
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

    return res.status(200).json(user).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
