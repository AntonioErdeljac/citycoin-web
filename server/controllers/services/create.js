const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    if (!req.body) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    const updatedService = {
      ...req.body,
      authorId: user._id,
    };

    if (!db.Services.isValid(updatedService)) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    const createdService = await db.Services.create(updatedService);

    return res.status(200).json(createdService).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
