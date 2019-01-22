const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!db.Services.isValid(req.body)) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
