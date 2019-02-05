const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const existingService = await db.Services.getById(id, { authorId: user._id });

    if (!existingService) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    await db.Services.removeById(id, { authorId: user._id });

    return res.status(201).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
