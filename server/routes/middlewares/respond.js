const _ = require('lodash');

const packageJSON = require('../../../package.json');

const DEFAULT_TITLE = 'CityCoin';

const buildParams = (req, params = {}) => ({
  pageData: {
    user: _.get(req, 'identity.user', {}),
  },
  title: params.title || DEFAULT_TITLE,
  version: packageJSON.version,
  isProduction: false,
});

module.exports = params => (req, res) => res.render('index', buildParams(req, params));
