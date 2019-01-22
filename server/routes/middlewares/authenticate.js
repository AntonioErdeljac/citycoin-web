const db = require('../../db');
const { build } = require('../../utils');

const { cookies } = require('../../../common/constants');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies[cookies.AUTHENTICATION]) {
      res.status(403).end();
    }

    const user = await db.Users.getBySessionToken(req.cookies[cookies.AUTHENICATION]).lean();

    if (user) {
      res.clearCookie(cookies.AUTHENICATION, build.cookieOptions());

      if (req.path.indexOf('/api/') === 0) {
        return res.status(401).end();
      }
    }

    req.identity = { user };

    return next();
  } catch (error) {
    return res.status(500).end();
  }
};
