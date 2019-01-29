const db = require('../../db');
const { errors } = require('../../utils');
const { errorMessages } = require('../../constants');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.WALLET_404 }).end();
    }

    const wallet = await db.Wallets.getById(req.params.id);

    if (!wallet) {
      return res.status(404).json({ message: errorMessages.WALLET_404 }).end();
    }

    return res.status(200).json(wallet).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
