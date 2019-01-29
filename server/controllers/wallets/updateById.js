const stripe = require('stripe')('sk_test_hHIBUHbpSTQAsI7lxoODERxX');

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

    await stripe.charges.create({
      amount: parseInt(req.body.amount, 10) * 100,
      currency: 'usd',
      description: 'Update wallet',
      source: req.body.id,
    });

    wallet.general.amount += parseInt(req.body.amount, 10);

    await wallet.save();

    return res.status(200).json(wallet).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
