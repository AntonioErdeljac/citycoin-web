const { authenticate } = require('../middlewares');

const { users } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.USERS_ID, authenticate, users.getById);
};
