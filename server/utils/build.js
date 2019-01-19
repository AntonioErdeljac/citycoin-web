const config = require('../config');

module.exports.cookieOptions = () => ({
  domain: config.domain,
  secure: config.protocol === 'https://',
  path: '/',
});
