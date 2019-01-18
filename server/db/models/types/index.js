module.exports.string = (options) => {
  const string = { type: String, trim: true };

  return { ...string, ...options };
};

module.exports.number = (options) => {
  const number = { type: Number };

  return { ...number, ...options };
};

module.exports.boolean = (options) => {
  const boolean = { type: Boolean };

  return { ...boolean, ...options };
};

module.exports.date = (options) => {
  const date = { type: Date };

  return { ...date, ...options };
};
