const moment = require('moment');

const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;

    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    if (!req.params.subscriptionId) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const service = await db.Services.getById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const subscription = await db.Subscriptions.getById(req.params.subscriptionId);

    if (!subscription) {
      return res.status(404).json({ message: errorMessages.SUBSCRIPTIONS_404 }).end();
    }

    const wallet = await db.Wallets.getById(user.walletId);

    if (!wallet) {
      return res.status(404).json({ message: errorMessages.WALLET_404 }).end();
    }

    if (subscription.price > wallet.general.amount) {
      return res.status(400).json({ message: errorMessages.SERVICE_INSUFFICIENT_FUNDS_400 }).end();
    }

    const subscribedService = {
      endsAt: moment(new Date()).add(subscription.duration, subscription.unit),
      serviceId: service._id,
      startsAt: new Date(),
      subscriptionId: subscription._id,
    };

    const createdSubscribedService = await db.SubscribedServices.create(subscribedService);

    const foundUser = await db.Users.getById(user._id);

    foundUser.subscribedServices = [createdSubscribedService._id, ...foundUser.subscribedServices];

    wallet.general.amount -= subscription.price;

    const foundAuthor = await db.Users.getById(subscription.authorId);

    if (!foundAuthor) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const foundAuthorWallet = await db.Wallets.getById(foundAuthor.walletId);

    if (!foundAuthorWallet) {
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    foundAuthorWallet.amount += subscription.price;

    await foundAuthorWallet.save();

    await wallet.save();

    await foundUser.save();

    return res.status(200).json(createdSubscribedService).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
