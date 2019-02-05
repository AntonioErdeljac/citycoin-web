const authentication = require('./authentication');
const cities = require('./cities');
const services = require('./services');
const subscribedServices = require('./subscribedServices');
const subscriptions = require('./subscriptions');
const users = require('./users');
const wallets = require('./wallets');

module.exports = (router) => {
  authentication(router);
  cities(router);
  services(router);
  subscribedServices(router);
  subscriptions(router);
  users(router);
  wallets(router);
};
