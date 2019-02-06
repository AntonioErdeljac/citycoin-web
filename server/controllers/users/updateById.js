const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors, tokens, hash } = require('../../utils');

const { MIN_PASSWORD_LENGTH } = require('../../../common/constants');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.identity;

    const newUser = {
      ...req.body,
      authorId: user._id,
    };

    const foundUser = await db.Users.getById(id, { authorId: user._id })
      .select('+authentication.salt +authentcation.password');

    if (!foundUser) {
      return res.status(404).json({ message: errorMessages.USERS_404 }).end();
    }

    const existingUser = await db.Users.getByEmail(newUser.contact.email, { excludedUserId: foundUser._id });

    if (existingUser) {
      return res.status(409).json({ message: errorMessages.USER_EMAIL_409 }).end();
    }

    newUser.authentication = {
      salt: foundUser.authentication.salt,
      password: foundUser.authentication.password,
    };

    if (!db.Users.isValid(newUser)) {
      return res.status(400).json({ message: errorMessages.USERS_400 }).end();
    }

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: errorMessages.USERS_404 }).end();
    }

    const updatedUser = await db.Users.updateById(id, newUser);

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
