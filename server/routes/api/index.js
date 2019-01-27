const authentication = require('./authentication');
const cities = require('./cities');
const services = require('./services');
const users = require('./users');

module.exports = (router) => {
  authentication(router);
  cities(router);
  services(router);
  users(router);
};
