const amenities = require('./amenities');
const authentication = require('./authentication');

module.exports = (router) => {
  amenities(router);
  authentication(router);
};
