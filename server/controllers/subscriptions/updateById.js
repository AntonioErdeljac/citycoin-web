const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    const subscription = {
      ...req.body,
      authorId: user._id,
    };

    if (!db.Subscriptions.isValid(subscription)) {
      return res.status(400).json({ message: errorMessages.SUBSCRIPTIONS_400 }).end();
    }

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    const existingSubscription = await db.Subscriptions.getById(id, { authorId: user._id });

    if (!existingSubscription) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    const updatedSubscription = await db.Subscriptions.updateById(id, subscription);

    return res.status(200).json(updatedSubscription).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
