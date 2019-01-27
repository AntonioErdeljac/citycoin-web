const db = require('../../db');
const { errors } = require('../../utils');
const { errorMessages } = require('../../constants');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.USER_404 }).end();
    }

    const user = await db.Users.getById(req.params.id)
      .populate('activeServices');

    if (!user) {
      return res.status(404).json({ message: errorMessages.USER_404 }).end();
    }

    return res.status(200).json(user).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
