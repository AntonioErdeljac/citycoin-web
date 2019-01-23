const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { subscriptions, service } = req.body;

    if (!subscriptions || !service) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    if (!db.Services.isValid(service)) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    subscriptions.forEach((subscription) => {
      if (!db.Subscriptions.isValid(subscription)) {
        return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
      }
      return null;
    });

    const updatedService = {
      ...service,
      subscriptions,
    };

    const createdService = await db.Services.create(updatedService);

    return res.status(200).json(createdService).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
