const authentication = require('./authentication');
const services = require('./services');

module.exports = (router) => {
  authentication(router);
  services(router);
};
