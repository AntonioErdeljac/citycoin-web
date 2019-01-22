const { authenticate } = require('../middlewares');

const { amenities } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.post(paths.api.v1.AMENITIES, authenticate, amenities.create);
};
