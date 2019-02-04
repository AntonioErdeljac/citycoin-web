const api = require('./api');
const client = require('./client');

module.exports.build = (path, ...params) => {
  params.reverse();
  return path.replace(/(:\w+)/g, () => params.pop());
};

module.exports.api = api;
module.exports.client = client;
