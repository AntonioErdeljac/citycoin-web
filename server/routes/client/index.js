const authentication = require('./authentication');
const cities = require('./cities');
const services = require('./services');
const subscriptions = require('./subscriptions');

module.exports = (router) => {
  authentication(router);
  cities(router);
  services(router);
  subscriptions(router);
};
