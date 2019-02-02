const { cookies, paths } = require('../../../common/constants');

module.exports = (req, res) => {
  res.clearCookie(cookies.AUTHENTICATION);

  res.redirect(paths.client.LOGIN);
};
