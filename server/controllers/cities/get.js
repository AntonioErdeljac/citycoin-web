const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const cities = await db.Cities.get(req.query);

    return res.status(200).json(cities).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
