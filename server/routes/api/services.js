const { authenticate } = require('../middlewares');

const { services } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.post(paths.api.v1.SERVICES, authenticate, services.create);
};
