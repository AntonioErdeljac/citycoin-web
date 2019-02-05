const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    const existingSubscription = await db.Subscriptions.getById(id, { authorId: user._id });

    if (!existingSubscription) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    await db.Subscriptions.removeById(id, { authorId: user._id });

    return res.status(201).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
