const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    if (!req.body) {
      return res.status(400).json({ message: errorMessages.SUBSCRIPTIONS_400 }).end();
    }

    const subscription = {
      ...req.body,
      authorId: user._id,
    };

    if (!db.Subscriptions.isValid(subscription)) {
      return res.status(400).json({ message: errorMessages.SUBSCRIPTIONS_400 }).end();
    }

    const createdSubscription = await db.Subscriptions.create(subscription);

    return res.status(200).json(createdSubscription).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
