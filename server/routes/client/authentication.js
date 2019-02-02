const { authenticate, respond, logout } = require('../middlewares');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.client.DASHBOARD, authenticate, respond());
  router.get(paths.client.LOGIN, respond());
  router.get(paths.client.LOGOUT, logout);
  router.get(paths.client.REGISTER, respond());
};
