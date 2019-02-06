const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: errorMessages.CITIES_404 }).end();
    }

    const city = await db.Cities.getById(req.params.id)
      .populate({
        path: 'services',
        populate: {
          path: 'subscriptions',
        },
      });

    if (!city) {
      return res.status(400).json({ message: errorMessages.CITIES_404 }).end();
    }

    return res.status(200).json(city).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
