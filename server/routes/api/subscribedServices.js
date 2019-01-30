const { authenticate } = require('../middlewares');

const { subscribedServices } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.SUBSCRIBED_SERVICES_ID, authenticate, subscribedServices.getById);

  router.get(paths.api.v1.SUBSCRIBED_SERVICES_ID_VERIFICATION, authenticate, subscribedServices.verify);
};
