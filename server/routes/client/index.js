const authentication = require('./authentication');
const cities = require('./cities');
const services = require('./services');
const subscriptions = require('./subscriptions');
const supervisors = require('./supervisors');

module.exports = (router) => {
  authentication(router);
  cities(router);
  services(router);
  subscriptions(router);
  supervisors(router);
};
