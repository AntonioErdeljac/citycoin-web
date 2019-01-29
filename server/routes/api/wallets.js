const { authenticate } = require('../middlewares');

const { wallets } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.WALLETS_ID, authenticate, wallets.getById);
  router.put(paths.api.v1.WALLETS_ID, authenticate, wallets.updateById);
};
