const config = require('./server/config');

module.exports.entry = [
  './client/react/index.js',
];

module.exports.output = {
  filename: './js/app.js',
  path: `${__dirname}/static`,
  publicPath: `${config.serverUrl}/`,
};

module.exports.resolve = {
  extensions: ['.js', '.jsx'],
};

module.exports.module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    },
  ],
};
