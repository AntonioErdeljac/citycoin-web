const { authenticate } = require('../middlewares');

const { cities } = require('../../controllers');

const { paths } = require('../../../common/constants');

module.exports = (router) => {
  router.get(paths.api.v1.CITIES_ID, authenticate, cities.getById);

  router.post(paths.api.v1.CITIES, authenticate, cities.create);
  router.get(paths.api.v1.CITIES, authenticate, cities.get);
};
