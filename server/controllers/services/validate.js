const _ = require('lodash');

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
      return res.status(404).json({ message: errorMessages.SERVICES_404 }).end();
    }

    const foundUser = await db.Users.getById(user._id);

    const subscribedService = _.find(foundUser.subscribedServices, { serviceId: req.params.id });
    if (!subscribedService) {
      return res.status(400).json({ message: errorMessages.SERVICES_VALIDATE_400 }).end();
    }

    const serviceSubscription = _.find(foundUser.subscribedServices, { subscriptionId: req.params.subscriptionId });
    if (!serviceSubscription) {
      return res.status(400).json({ message: errorMessages.SERVICES_VALIDATE_400 }).end();
    }

    return res.status(200).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
