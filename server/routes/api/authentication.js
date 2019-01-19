const { paths } = require('../../../common/constants');

const { authentication } = require('../../controllers');

module.exports = (router) => {
  router.post(paths.api.v1.AUTHENTICATION_REGISTRATION, authentication.register);

  router.post(paths.api.v1.AUTHENTICATION_LOGIN, authentication.login);
};
