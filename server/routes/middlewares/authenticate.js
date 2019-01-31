const _ = require('lodash');

const db = require('../../db');
const { build } = require('../../utils');

const { cookies, paths } = require('../../../common/constants');

module.exports = async (req, res, next) => {
  try {
    const token = _.get(req.cookies, cookies.AUTHENTICATION) || _.get(req, 'headers.authorization');

    if (!token) {
      return res.redirect(paths.client.LOGIN);
    }

    const user = await db.Users.getBySessionToken(token).lean();

    if (!user) {
      res.clearCookie(cookies.AUTHENICATION, build.cookieOptions());

      if (req.path.indexOf('/api/') === 0) {
        return res.status(401).end();
      }

      return res.redirect(paths.client.LOGIN);
    }

    req.identity = { user };

    return next();
  } catch (error) {
    return res.status(500).end();
  }
};
