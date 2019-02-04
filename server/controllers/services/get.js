const db = require('../../db');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;
    const { isBusiness } = req.query;

    const services = await db.Services.get({ ...req.query, authorId: isBusiness ? user._id : null });

    return res.status(200).json(services).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
