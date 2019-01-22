const authentication = require('./authentication');
const cities = require('./cities');
const services = require('./services');

module.exports = (router) => {
  authentication(router);
  cities(router);
  services(router);
};
