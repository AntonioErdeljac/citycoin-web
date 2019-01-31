const { authenticate } = require('../middlewares');

const { cities } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.CITIES_ID, authenticate, cities.getById);

  router.get(paths.api.v1.CITIES, cities.get);
};
