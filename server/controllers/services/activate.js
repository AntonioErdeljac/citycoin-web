const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    if (!req.params.id) {
      res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const service = await db.Services.getById(req.params.id);

    if (!service) {
      res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const activeService = {
      serviceId: service._id,
      startsAt: new Date(),
      endsAt: new Date() + 1,
    };

    user.activeServices.concat(activeService);

    await user.save();

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
