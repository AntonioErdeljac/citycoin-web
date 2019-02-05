const { authenticate } = require('../middlewares');

const { subscriptions } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.post(paths.api.v1.SUBSCRIPTIONS, authenticate, subscriptions.create);
  router.get(paths.api.v1.SUBSCRIPTIONS, authenticate, subscriptions.get);

  router.get(paths.api.v1.SUBSCRIPTIONS_ID, authenticate, subscriptions.getById);
  router.put(paths.api.v1.SUBSCRIPTIONS_ID, authenticate, subscriptions.updateById);
  router.delete(paths.api.v1.SUBSCRIPTIONS_ID, authenticate, subscriptions.removeById);
};
