const moment = require('moment');

const db = require('../../db');
const { errorMessages } = require('../../constants');
const { errors } = require('../../utils');

module.exports = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: errorMessages.SUBSCRIBED_SERVICE_404 }).end();
    }

    const subscribedService = await db.SubscribedServices.getById(req.params.id)
      .populate('serviceId')
      .populate('subscriptionId');

    if (!subscribedService) {
      return res.status(404).json({ message: errorMessages.SUBSCRIBED_SERVICE_404 }).end();
    }

    if (moment(new Date()).isAfter(subscribedService.endsAt)) {
      return res.status(410).json({ message: errorMessages.SUBSCRIBED_SERVICE_EXPIRED_410 }).end();
    }

    return res.status(200).json(subscribedService).end();
  } catch (error) {
    return errors.respond(res, error);
  }
};
