const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    if (!req.body) {
      return res.status(400).json({ message: errorMessages.CITIES_400 }).end();
    }

    if (!db.Cities.isValid(req.body)) {
      return res.status(400).json({ message: errorMessages.CITIES_400 }).end();
    }

    const updatedCity = {
      ...req.body,
      authorId: user._id,
    };

    const createdCity = await db.Cities.create(updatedCity);

    return res.status(200).json(createdCity).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
