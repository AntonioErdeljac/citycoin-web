const domain = process.env.DOMAIN || 'localhost';
const protocol = process.env.PROTOCOL || 'http://';
const port = process.env.PORT || 3000;

module.exports.domain = domain;
module.exports.protocol = protocol;
module.exports.port = port;

module.exports.serverUrl = process.env.SERVER_URL || `${protocol}${domain}${port ? `:${port}` : ''}`;

module.exports.mongodb = {
  uri: 'mongodb://localhost:27017/citycoin',
};
