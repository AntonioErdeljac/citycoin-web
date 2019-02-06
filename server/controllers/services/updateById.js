const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    const service = {
      ...req.body,
      authorId: user._id,
    };

    if (!db.Services.isValid(service)) {
      return res.status(400).json({ message: errorMessages.SERVICES_400 }).end();
    }

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const existingService = await db.Services.getById(id, { authorId: user._id });

    if (!existingService) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const updatedService = await db.Services.updateById(id, service);

    return res.status(200).json(updatedService).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
