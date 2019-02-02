const moment = require('moment');
const { get } = require('lodash');

const { languages } = require('./constants');

let activeLocale = languages.SUPPORTED_LOCALES[0];

module.exports.setLocale = (locale) => {
  activeLocale = languages.SUPPORTED_LOCALES.includes(locale) ? locale : languages.SUPPORTED_LOCALES[0];
  moment.locale(activeLocale);
};

module.exports._t = value => get(languages[activeLocale], value) || value;
