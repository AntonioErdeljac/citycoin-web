const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    const city = {
      ...req.body,
      authorId: user._id,
    };

    if (!db.Cities.isValid(city)) {
      return res.status(400).json({ message: errorMessages.CITIES_400 }).end();
    }

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.CITIES_404 }).end();
    }

    const existingCity = await db.Cities.getById(id, { authorId: user._id });

    if (!existingCity) {
      return res.status(404).json({ message: errorMessages.CITIES_404 }).end();
    }

    const updatedCity = await db.Cities.updateById(id, city);

    return res.status(200).json(updatedCity).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
