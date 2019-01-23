const { authenticate } = require('../middlewares');

const { services } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.post(paths.api.v1.SERVICES, authenticate, services.create);

  router.get(paths.api.v1.SERVICES_ID, authenticate, services.getById);

  router.get(paths.api.v1.SERVICES_ACTIVATE_ID, authenticate, services.activate);
};
