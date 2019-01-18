const db = require('../../db');

module.exports = async (req, res) => {
  const user = req.body;

  const existingUser = await db.Users.getByEmail(user.contact.email);

  if (existingUser) {
    return res.status(400).json({ message: 'Email already taken' });
  }
};
