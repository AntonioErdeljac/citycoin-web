const { authenticate } = require('../middlewares');

const { users } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.USERS_ID, authenticate, users.getById);
  router.put(paths.api.v1.USERS_ID, authenticate, users.updateById);
  router.delete(paths.api.v1.USERS_ID, authenticate, users.removeById);

  router.get(paths.api.v1.USERS, authenticate, users.get);
  router.post(paths.api.v1.USERS, authenticate, users.create);
};
