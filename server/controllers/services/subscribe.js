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

    const subscribedService = {
      endsAt: moment(new Date()).add(subscription.duration, subscription.unit),
      serviceId: service._id,
      startsAt: new Date(),
      subscriptionId: subscription._id,
    };

    const foundUser = await db.Users.getById(user._id);

    foundUser.subscribedServices.concat(subscribedService);

    await foundUser.save();

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
