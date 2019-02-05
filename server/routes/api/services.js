const { authenticate } = require('../middlewares');

const { services } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.post(paths.api.v1.SERVICES, authenticate, services.create);
  router.get(paths.api.v1.SERVICES, authenticate, services.get);

  router.get(paths.api.v1.SERVICES_ID, authenticate, services.getById);
  router.put(paths.api.v1.SERVICES_ID, authenticate, services.updateById);
  router.delete(paths.api.v1.SERVICES_ID, authenticate, services.removeById);

  router.get(paths.api.v1.SERVICES_ID_SUBSCRIPTIONS_ID, authenticate, services.subscribe);
};
