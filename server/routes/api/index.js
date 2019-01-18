const authentication = require('./authentication');

module.exports = (router) => {
  authentication(router);
};
