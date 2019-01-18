module.exports.generate = (size = 10, numeric = false) => {
  const possibleChars = numeric ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < size; i += 1) {
    token += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return token;
};
