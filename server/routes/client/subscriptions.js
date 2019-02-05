const { authenticate, respond } = require('../middlewares');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.client.SUBSCRIPTIONS, authenticate, respond());
  router.get(paths.client.SUBSCRIPTIONS_NEW, authenticate, respond());
  router.get(paths.client.SUBSCRIPTIONS_ID, authenticate, respond());
};
