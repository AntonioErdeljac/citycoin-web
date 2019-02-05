const { authenticate, respond } = require('../middlewares');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.client.SERVICES, authenticate, respond());
  router.get(paths.client.SERVICES_NEW, authenticate, respond());
  router.get(paths.client.SERVICES_ID, authenticate, respond());
};
