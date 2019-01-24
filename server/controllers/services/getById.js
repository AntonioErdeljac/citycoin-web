const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const service = await db.Services.getById(req.params.id)
      .populate('subscriptions');

    if (!service) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    return res.status(200).json(service).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
