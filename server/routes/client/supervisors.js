const { authenticate, respond } = require('../middlewares');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.client.SUPERVISORS, authenticate, respond());
  router.get(paths.client.SUPERVISORS_NEW, authenticate, respond());
  router.get(paths.client.SUPERVISORS_ID, authenticate, respond());
};
