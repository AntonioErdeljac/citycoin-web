const crypto = require('crypto');

const SECRET = 'citycoin';

module.exports.authentication = (token, user) => crypto.createHmac('sha256', [token, user].join('/')).update(SECRET).digest('hex').toLowerCase();

module.exports.password = (token, password) => crypto.createHmac('sha256', [token, password].join('/')).update(SECRET).digest('hex').toLowerCase();
