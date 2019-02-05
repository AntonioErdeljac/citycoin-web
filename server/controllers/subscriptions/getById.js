const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    const subscription = await db.Subscriptions.getById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    return res.status(200).json(subscription).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
