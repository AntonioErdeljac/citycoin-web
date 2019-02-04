const { authenticate, respond } = require('../middlewares');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.client.CITIES, authenticate, respond());
  router.get(paths.client.CITIES_NEW, authenticate, respond());
  router.get(paths.client.CITIES_ID, authenticate, respond());
  router.get(paths.client.BASE, authenticate, respond());
};
