const db = require('../../db');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;
    const { isBusiness } = req.query;

    const subscriptions = await db.Subscriptions.get({ ...req.query, authorId: isBusiness ? user._id : null });

    return res.status(200).json(subscriptions).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
