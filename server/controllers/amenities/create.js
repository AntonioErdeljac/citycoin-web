const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!db.Amenities.isValid(req.body)) {
      return res.status(400).json({ message: errorMessages.AMENITY_400 }).end();
    }

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
